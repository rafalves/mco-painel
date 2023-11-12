import { TwitterApi, TwitterApiReadWrite } from 'twitter-api-v2';
import TwitterApiBase from 'twitter-api-v2/dist/esm/client.base';

export default defineNitroPlugin(async (nitroApp) => {

  // const twitterClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAL3JqwEAAAAAfSzzkamM5ULFZU5b0kLdelFs6yI%3DstYj2TSZ94QOPz5sFBtoxXFvQkQxyPd2EEEF6Oe1jDCENgLKVe')



  const twitterClient = new TwitterApi({
    appKey: 'ZsK5qaAlnilbGzjb3xcIB1o83  ',
    appSecret: '1QpV2tf7gknH9T2WBgt5dUG8Ye86bmHSnwaOTRT8VYhTVPB3c4',
    accessToken: '1616080969827508224-YDrLRBB21e8I1PIw0g4p4cyw2rZf1F',
    accessSecret: 'ytJldcA4IZ0XdTSE65yZduLvgTwnXHLUuQNAzqdUizk6Y',
  });

  const readWriteClient = twitterClient.readWrite;

  nitroApp.hooks.hook("request", async (event) => {
    event.context.twitterBot = readWriteClient
  })

  console.log('Loading twitter bot plugin')


  // Play with the built in methods
  // const user = await readWriteClient.v2.userByUsername('plhery');
  // await twitterClient.v2.tweet('Hello, this is a test.');
  // You can upload media easily!
  // await twitterClient.v1.uploadMedia('./big-buck-bunny.mp4');
})