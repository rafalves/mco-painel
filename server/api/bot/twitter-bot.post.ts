import { TwitterApiReadWrite } from 'twitter-api-v2';

export default defineEventHandler(async (event) => {

  console.log('twitter bot')

  const body = await readBody(event)

  const readWriteClient: TwitterApiReadWrite = event.context.twitterBot

  // const user = await readWriteClient.v2.userByUsername('plhery');
  try {
    await readWriteClient.v2.tweet('Hello, this is a test.');
  } catch (err) {
    console.log(err)
  }

  console.log(body)
})