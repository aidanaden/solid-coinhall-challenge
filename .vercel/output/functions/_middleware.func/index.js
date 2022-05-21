export default function middleware(_request, _event) {
  const response = new Response()

  if (_request.headers.userAgent.toLowerCase().includes('google')) {
    Response.redirect('https://www.google.com')
  }
  // return fetch('www.google.com', 'GET')

  // Set custom header
  response.headers.set('x-modified-edge', 'true')

  // "Pass through" the middleware to complete the HTTP request
  response.headers.set('x-middleware-next', '1')

  return response
}
