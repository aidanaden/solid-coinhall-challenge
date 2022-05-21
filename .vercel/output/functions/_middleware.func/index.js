export default function middleware(_request, _event) {
  const response = new Response()

  const requestUserAgent = _request.headers.get('User-Agent')

  if (requestUserAgent === 'Googlebot') {
    response.headers.set('X-Prerender-Token', '1Nk4QIGWeQxzTP4Tt4I1')
    return Response.redirect(
      'https://service.prerender.io/https://solid-coinhall-challenge.vercel.app'
    )
  }

  // Set custom header
  response.headers.set('x-modified-edge', 'true')

  response.headers.set('X-Prerender-Token', '1Nk4QIGWeQxzTP4Tt4I1')

  response.headers.set('x-request-user-agent', requestUserAgent)

  // "Pass through" the middleware to complete the HTTP request
  response.headers.set('x-middleware-next', '1')

  return response
}
