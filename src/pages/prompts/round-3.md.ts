import prompt from '../../data/round-3-prompt.md?raw';

export function GET() {
  return new Response(prompt, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
