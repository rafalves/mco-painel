import { TwitterApi } from 'twitter-api-v2';

export default defineEventHandler(async (event) => {
  const callbackURL = 'http://localhost:3000/twitter/callback'

  const twitterClient: TwitterApi = event.context.twitterClientV2

  const { state, code, oauth_token, oauth_verifier } = await readBody(event)

  if (state && code) {
    const codeVerifier = await useStorage('db').getItem<string>('codeVerifier',)
    const storedState = await useStorage('db').getItem<string>('state')

    if (!codeVerifier || !state || !storedState || !code) {
      createError({ statusText: 'You denied the app or your session expired!', status: 400 })
    }

    if (state !== storedState) {
      createError({ statusText: 'Stored tokens didnt match!', status: 400 })
    }

    if (codeVerifier) {
      const { client: loggedClient, accessToken, refreshToken, expiresIn } = await twitterClient.loginWithOAuth2({ code, codeVerifier, redirectUri: callbackURL })

      if (refreshToken) {
        await useStorage('db').setItem('accessToken', accessToken)
        await useStorage('db').setItem('refreshToken', refreshToken)
      }

      const { data: userObject } = await loggedClient.v2.me();

      return {
        userObject, expiresIn
      }
    }

  } else {
    console.log('entrou')
    const oauth_token_secret = await useStorage('db').getItem<string>('oauth_token_secret')

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
      createError({ statusText: 'You denied the app or your session expired!', status: 400 })
    }

    console.log('entrou 1')

    console.log('oauth_token: ' + oauth_token)
    console.log('oauth_verifier: ' + oauth_verifier)
    console.log('oauth_token_secret: ' + oauth_token_secret)

    const client = new TwitterApi({
      appKey: '5jaT1ibLcRLMojXmMXP5U0Tww',
      appSecret: '7EZa1ZerTZdfv422mmtQquUvGbIcmcYTzxojK23rWgra6O8SdS',
      accessToken: oauth_token!,
      accessSecret: oauth_token_secret!,
    });

    console.log('entrou 2')


    const { client: loggedClient, accessToken, accessSecret } = await client.login(oauth_verifier!)

    console.log('entrou 3')

    if (accessToken && accessSecret) {
      await useStorage('db').setItem('accessTokenV1', accessToken)
      await useStorage('db').setItem('accessSecretV1', accessSecret)
    }

    console.log('entrou 4')

  }
})