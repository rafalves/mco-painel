import { TwitterApi } from 'twitter-api-v2';

export default defineEventHandler(async (event) => {
  const callbackURL = 'http://localhost:3000/twitter/callback'

  const twitterClient: TwitterApi = event.context.twitterClientV1

  const authLink = await twitterClient.generateAuthLink(callbackURL, { linkMode: 'authorize' });

  console.log(authLink)
  await useStorage('db').setItem('oauth_token', authLink.oauth_token)
  await useStorage('db').setItem('oauth_token_secret', authLink.oauth_token_secret)

  return { url: authLink.url }
})