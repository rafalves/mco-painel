export default defineEventHandler(async (event) => {

  // console.log('entrei middleware')
  if (getRequestURL(event).pathname === '/api/postOffer/lomadee') {
    const body = await readBody(event)
    const error = { status: 400, message: 'missing param' }
    const missingParam = createError({
      statusText: 'Bad Request',
      status: 400,
      data: error
    });

    if (!body.name) {
      error.message = 'missing or invalid name'
      sendError(event, missingParam)
    }
    if (!body.link) {
      error.message = 'missing or invaid link'
      sendError(event, missingParam)
    }
    if (!body.thumbnail) {
      error.message = 'missing or invaid thumbnail url'
      sendError(event, missingParam)
    }
    if (!body.price) {
      error.message = 'missing or invaid price'
      sendError(event, missingParam)
    }
  }
  // console.log('sai middleware')
})