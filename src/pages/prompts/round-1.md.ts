import prompt from '../../data/master-prompt.md?raw';

export function GET() {
  return new Response(prompt, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
