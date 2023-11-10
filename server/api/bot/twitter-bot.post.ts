export default defineEventHandler(async (event) => {

  console.log('twitter bot')

  const body = await readBody(event)

  console.log(body)
})