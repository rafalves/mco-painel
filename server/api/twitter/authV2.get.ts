import { TwitterApi } from 'twitter-api-v2';

export default defineEventHandler(async (event) => {
  const callbackURL = 'http://localhost:3000/twitter/callback'

  const twitterClient: TwitterApi = event.context.twitterClientV2

  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(callbackURL, { scope: ['tweet.read', 'tweet.write', 'offline.access', 'users.read'] });

  await useStorage('db').setItem('codeVerifier', codeVerifier)
  await useStorage('db').setItem('state', state)

  return { url: url }
})