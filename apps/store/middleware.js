export const config = {
  matcher: '/api/:path*',
}

export default async function middleware(request) {
  const backendUrl = process.env.VITE_API_URL
  if (!backendUrl) {
    return new Response('VITE_API_URL environment variable is missing', { status: 500 })
  }
  const url = new URL(request.url)

  const targetUrl = new URL(`${url.pathname}${url.search}`, backendUrl)

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ['GET', 'HEAD'].includes(request.method) ? null : request.body,
  })
}
