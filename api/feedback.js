import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

const feedbackKinds = new Set(['general', 'game-idea', 'benchmark', 'bug']);

function field(value) {
  if (Array.isArray(value)) return String(value[0] ?? '').trim();
  return String(value ?? '').trim();
}

function parseBody(request) {
  if (typeof request.body === 'string') {
    return Object.fromEntries(new URLSearchParams(request.body));
  }

  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  return {};
}

function redirect(response, location) {
  response.statusCode = 303;
  response.setHeader('Location', location);
  response.end();
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = parseBody(request);

  if (field(body.website)) {
    redirect(response, '/thanks');
    return;
  }

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
    redirect(response, '/feedback?error=invalid');
    return;
  }

  const submittedAt = new Date().toISOString();
  const pathname = [
    'feedback',
    submittedAt.slice(0, 10),
    `${submittedAt.replaceAll(':', '-')}-${randomUUID()}.json`,
  ].join('/');

  try {
    await put(
      pathname,
      JSON.stringify({
        submittedAt,
        kind,
        message,
        replyEmail: replyEmail || null,
        pagePath,
      }, null, 2),
      {
        access: 'private',
        addRandomSuffix: false,
        contentType: 'application/json',
      },
    );

    redirect(response, '/thanks');
  } catch (error) {
    console.error('Feedback storage failed', error);
    redirect(response, '/feedback?error=send');
  }
}
