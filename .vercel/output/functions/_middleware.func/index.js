export default function middleware(_request, _event) {
  const response = new Response()

  response.headers.set('request', _request)

  // Set custom header
  response.headers.set('x-modified-edge', 'true')

  // "Pass through" the middleware to complete the HTTP request
  response.headers.set('x-middleware-next', '1')

  return response
}
