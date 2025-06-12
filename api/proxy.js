export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing 'url' param", { status: 400 });
  }

  const proxiedResponse = await fetch(target, {
    method: req.method,
    headers: req.headers,
    redirect: "manual"
  });

  const body = await proxiedResponse.text();

  return new Response(body, {
    status: proxiedResponse.status,
    headers: proxiedResponse.headers
  });
}
