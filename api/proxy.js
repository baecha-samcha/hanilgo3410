import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import { parse } from 'url';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response("Missing 'url' param", { status: 400 });
  }

  const resp = await fetch(target, {
    headers: req.headers,
    method: req.method,
    redirect: 'manual',
  });

  return resp;
}
