/// <reference path="../worker-configuration.d.ts" />

const feedbackKinds = new Set(['general', 'game-idea', 'benchmark', 'bug']);
const maximumBodyBytes = 16_384;

class InvalidBodyError extends Error {}

/** @param {unknown} value */
function field(value) {
  if (Array.isArray(value)) return String(value[0] ?? '').trim();
  return String(value ?? '').trim();
}

/**
 * Read only a small, bounded form or JSON body. The public form sends URL-encoded
 * data; JSON remains supported to preserve the existing endpoint behaviour.
 *
 * @param {Request} request
 * @returns {Promise<Record<string, unknown>>}
 */
async function parseBody(request) {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBodyBytes) {
    throw new InvalidBodyError('body_too_large');
  }

  if (!request.body) return {};

  const reader = request.body.getReader();
  /** @type {Uint8Array[]} */
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maximumBodyBytes) {
      await reader.cancel('body_too_large');
      throw new InvalidBodyError('body_too_large');
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const bodyText = new TextDecoder().decode(bytes);
  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim();

  if (contentType === 'application/json') {
    let parsed;
    try {
      parsed = JSON.parse(bodyText);
    } catch {
      throw new InvalidBodyError('invalid_json');
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new InvalidBodyError('invalid_json');
    }
    return parsed;
  }

  /** @type {Record<string, string>} */
  const parsed = {};
  for (const [key, value] of new URLSearchParams(bodyText)) {
    if (!(key in parsed)) parsed[key] = value;
  }
  return parsed;
}

/** @param {string} location */
function redirect(location) {
  return new Response(null, {
    status: 303,
    headers: {
      'Cache-Control': 'no-store',
      Location: location,
    },
  });
}

function methodNotAllowed() {
  return Response.json(
    { error: 'Method not allowed' },
    {
      status: 405,
      headers: {
        Allow: 'POST',
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
}

/**
 * @param {Request} request
 * @param {Env} env
 */
export async function handleFeedbackRequest(request, env) {
  if (request.method !== 'POST') return methodNotAllowed();

  let body;
  try {
    body = await parseBody(request);
  } catch (error) {
    if (error instanceof InvalidBodyError) return redirect('/feedback?error=invalid');
    throw error;
  }

  if (field(body.website)) return redirect('/thanks');

  const kind = field(body.kind);
  const message = field(body.message);
  const replyEmail = field(body.replyEmail);
  const submittedPath = field(body.pagePath);
  const pagePath = submittedPath.startsWith('/') && submittedPath.length <= 500
    ? submittedPath
    : '/feedback';

  if (
    !feedbackKinds.has(kind)
    || message.length < 10
    || message.length > 2000
    || replyEmail.length > 254
    || (replyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail))
  ) {
    return redirect('/feedback?error=invalid');
  }

  const submittedAt = new Date().toISOString();
  const pathname = [
    'feedback',
    submittedAt.slice(0, 10),
    `${submittedAt.replaceAll(':', '-')}-${crypto.randomUUID()}.json`,
  ].join('/');

  try {
    await env.FEEDBACK_BUCKET.put(
      pathname,
      JSON.stringify({
        submittedAt,
        kind,
        message,
        replyEmail: replyEmail || null,
        pagePath,
      }, null, 2),
      { httpMetadata: { contentType: 'application/json' } },
    );
    return redirect('/thanks');
  } catch (error) {
    console.error(JSON.stringify({
      event: 'feedback_storage_failed',
      errorType: error instanceof Error ? error.name : 'UnknownError',
    }));
    return redirect('/feedback?error=send');
  }
}

/**
 * @param {Request} request
 * @param {Env} env
 */
async function fetch(request, env) {
  if (new URL(request.url).pathname === '/api/feedback') {
    return handleFeedbackRequest(request, env);
  }
  return env.ASSETS.fetch(request);
}

/** @satisfies {ExportedHandler<Env>} */
export default { fetch };
