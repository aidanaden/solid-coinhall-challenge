export default function middleware(_request, _event) {
  const response = new Response()

  const requestUserAgent = _request.headers.get('User-Agent')

  if (requestUserAgent === 'google') {
    return Response.redirect('https://www.google.com')
  }

  // Set custom header
  response.headers.set('x-modified-edge', 'true')

  response.headers.set('x-request-headers', 'true')

  response.headers.set('x-request-user-agent', requestUserAgent)

  // "Pass through" the middleware to complete the HTTP request
  response.headers.set('x-middleware-next', '1')

  return response
}
