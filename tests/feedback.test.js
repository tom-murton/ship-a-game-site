import assert from 'node:assert/strict';
import test from 'node:test';

import worker, { handleFeedbackRequest } from '../worker/index.js';

function createEnvironment({ putError } = {}) {
  const writes = [];
  let assetRequests = 0;
  return {
    env: {
      ASSETS: {
        async fetch(request) {
          assetRequests += 1;
          return new Response(`asset:${new URL(request.url).pathname}`);
        },
      },
      FEEDBACK_BUCKET: {
        async put(key, value, options) {
          if (putError) throw putError;
          writes.push({ key, value, options });
          return {};
        },
      },
    },
    writes,
    assetRequestCount: () => assetRequests,
  };
}

function feedbackRequest(body, contentType = 'application/x-www-form-urlencoded') {
  return new Request('https://shipagame.weevolve.app/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: contentType === 'application/json'
      ? JSON.stringify(body)
      : new URLSearchParams(body),
  });
}

test('rejects non-POST methods without invoking storage', async () => {
  const { env, writes } = createEnvironment();
  const response = await handleFeedbackRequest(
    new Request('https://shipagame.weevolve.app/api/feedback'),
    env,
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { error: 'Method not allowed' });
  assert.equal(writes.length, 0);
});

test('accepts valid URL-encoded feedback and writes one private R2 object', async () => {
  const { env, writes } = createEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest({
    kind: 'benchmark',
    message: 'This is a clearly marked test message.',
    replyEmail: 'tester@example.com',
    pagePath: '/games/brinkball',
  }), env);

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/thanks');
  assert.equal(writes.length, 1);
  assert.match(writes[0].key, /^feedback\/\d{4}-\d{2}-\d{2}\/.+\.json$/);
  assert.deepEqual(writes[0].options, {
    httpMetadata: { contentType: 'application/json' },
  });
  const stored = JSON.parse(writes[0].value);
  assert.equal(stored.kind, 'benchmark');
  assert.equal(stored.message, 'This is a clearly marked test message.');
  assert.equal(stored.replyEmail, 'tester@example.com');
  assert.equal(stored.pagePath, '/games/brinkball');
  assert.match(stored.submittedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('preserves JSON submissions and normalises invalid source paths', async () => {
  const { env, writes } = createEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest({
    kind: 'general',
    message: 'JSON feedback remains supported.',
    replyEmail: '',
    pagePath: 'https://example.com/not-local',
  }, 'application/json'), env);

  assert.equal(response.status, 303);
  assert.equal(writes.length, 1);
  const stored = JSON.parse(writes[0].value);
  assert.equal(stored.replyEmail, null);
  assert.equal(stored.pagePath, '/feedback');
});

test('honeypot submissions succeed without storing an object', async () => {
  const { env, writes } = createEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest({
    website: 'spam.example',
    kind: 'general',
    message: 'This should not be stored.',
  }), env);

  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/thanks');
  assert.equal(writes.length, 0);
});

for (const [name, body] of [
  ['unknown category', { kind: 'other', message: 'A long enough message' }],
  ['short message', { kind: 'general', message: 'Too short' }],
  ['invalid email', { kind: 'general', message: 'A long enough message', replyEmail: 'not-email' }],
  ['long message', { kind: 'general', message: 'x'.repeat(2001) }],
]) {
  test(`rejects ${name} without storing an object`, async () => {
    const { env, writes } = createEnvironment();
    const response = await handleFeedbackRequest(feedbackRequest(body), env);
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), '/feedback?error=invalid');
    assert.equal(writes.length, 0);
  });
}

test('rejects oversized request bodies before parsing', async () => {
  const { env, writes } = createEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest({
    kind: 'general',
    message: 'x'.repeat(17_000),
  }), env);
  assert.equal(response.status, 303);
  assert.equal(response.headers.get('location'), '/feedback?error=invalid');
  assert.equal(writes.length, 0);
});

test('returns the existing safe error redirect when R2 storage fails', async () => {
  const { env } = createEnvironment({ putError: new Error('simulated') });
  const originalConsoleError = console.error;
  const logged = [];
  console.error = (message) => logged.push(message);
  try {
    const response = await handleFeedbackRequest(feedbackRequest({
      kind: 'bug',
      message: 'Storage should fail for this test.',
    }), env);
    assert.equal(response.status, 303);
    assert.equal(response.headers.get('location'), '/feedback?error=send');
    assert.equal(logged.length, 1);
    assert.equal(logged[0].includes('Storage should fail'), false);
  } finally {
    console.error = originalConsoleError;
  }
});

test('bypasses the Worker for non-API requests if routing expands accidentally', async () => {
  const { env, assetRequestCount } = createEnvironment();
  const response = await worker.fetch(
    new Request('https://shipagame.weevolve.app/prompt'),
    env,
  );
  assert.equal(await response.text(), 'asset:/prompt');
  assert.equal(assetRequestCount(), 1);
});
