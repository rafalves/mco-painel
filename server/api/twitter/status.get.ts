import { TwitterApi } from 'twitter-api-v2';
import { TwitterApiRateLimitPlugin } from '@twitter-api-v2/plugin-rate-limit'

export default defineEventHandler(async (event) => {
  const v2: TwitterApi = event.context.twitterClientV2
  await useTwitterAPI.authenticatedClientV2(v2)

  const accessToken = await useStorage('db').getItem<string>('accessToken')

  if (!accessToken) {
    createError({ statusText: 'Access Token não existe ', status: 500 })
  }

  const rateLimitPlugin = new TwitterApiRateLimitPlugin()
  const clientV2 = await new TwitterApi(accessToken!, { plugins: [rateLimitPlugin] })

  await clientV2.v2.tweet('teste')

  const currentRateLimitForMe = await rateLimitPlugin.v2.getRateLimit('tweets')

  console.log(currentRateLimitForMe)

})