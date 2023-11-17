import { TwitterApi } from 'twitter-api-v2';

export const useTwitterAPI = {
  authenticatedClientV2: async (twitterClient: TwitterApi): Promise<TwitterApi> => {

    const refreshToken = await useStorage('db').getItem<string>('refreshToken')

    const expiresInStartDate = await useStorage('db').getItem<number>('expiresInStartDate') ?? 0
    const expiresInToken = await useStorage('db').getItem<number>('expiresInToken') ?? 7200

    console.log('expiresInStartDate: ' + expiresInStartDate)
    console.log('expiresInToken: ' + expiresInToken)

    function isTokenExpired() {
      console.log('entrou na funcão')
      const now = Math.floor(Date.now() / 1000)
      console.log('funcao now: ' + now)
      const passedTime = now - expiresInStartDate
      console.log('funcao passedTime: ' + passedTime)

      if (passedTime > (expiresInToken - 200)) {
        console.log('if funcao passedtime true')
        return true
      } else {
        console.log('if funcao passedtime false')
        return false
      }
    }

    if (isTokenExpired() && refreshToken) {
      console.log('entrou na funcao tempo expirado')

      const { client: refreshedClient, accessToken: newAccessToken, refreshToken: newRefreshToken, expiresIn: newExpiresIn } = await twitterClient.refreshOAuth2Token(refreshToken);

      const newExpiresInStartDate = Math.floor(Date.now() / 1000)

      await useStorage('db').setItem<number>('expiresInToken', newExpiresIn)
      await useStorage('db').setItem<number>('expiresInStartDate', newExpiresInStartDate)
      await useStorage('db').setItem('accessToken', newAccessToken)
      await useStorage('db').setItem('refreshToken', newRefreshToken!)

      console.log('retornando client autenticado')

      return refreshedClient

    } else {
      console.log('entrou na funcao tempo nao expirado')

      const accessToken = await useStorage('db').getItem<string>('accessToken')
      const client = await new TwitterApi(accessToken!)

      // const me = await client.v2.me()

      // console.log(me)
      console.log('retornando client autenticado')
      return client
    }
  },
  authenticatedClientV1: async (): Promise<TwitterApi> => {

    const accessToken = await useStorage('db').getItem<string>('accessTokenV1')
    const accessSecret = await useStorage('db').getItem<string>('accessSecretV1')


    const client = new TwitterApi({
      appKey: '5jaT1ibLcRLMojXmMXP5U0Tww',
      appSecret: '7EZa1ZerTZdfv422mmtQquUvGbIcmcYTzxojK23rWgra6O8SdS',
      accessToken: accessToken!,
      accessSecret: accessSecret!,
    });

    return client
  }
}