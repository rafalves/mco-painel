import { TwitterApi } from 'twitter-api-v2';

export default defineNitroPlugin(async (nitroApp) => {

  const twitterClientV1 = new TwitterApi({
    appKey: '5jaT1ibLcRLMojXmMXP5U0Tww',
    appSecret: '7EZa1ZerTZdfv422mmtQquUvGbIcmcYTzxojK23rWgra6O8SdS',
  });
  const twitterClientV2 = new TwitterApi({
    clientId: 'RzRpX01qbmV5ZEZxc1Z0VERUTno6MTpjaQ',
    clientSecret: '_GGhp4uUeZ7Rl0rQMroppGjyT3tg6MCCJ8Q9OW-vPL-9mPsTRB',
  });

  nitroApp.hooks.hook("request", async (event) => {
    event.context.twitterClientV1 = twitterClientV1
    event.context.twitterClientV2 = twitterClientV2
  })

  console.log('Loading twitter bot plugin')
})