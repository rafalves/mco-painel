import { EUploadMimeType, TwitterApi } from 'twitter-api-v2';
import { useGetImage } from '~/server/utils/useGetImage';
import { useStrapiApi } from '~/server/utils/useStrapiApi';

export default defineEventHandler(async (event) => {

  console.log('twitter bot')

  const body = await readBody(event)
  console.log(body.entry.id)

  const text = body.entry.twitterPost.toString()
  console.log(text)

  const buffer: Buffer | void = await useStrapiApi.getImg2Url(body.entry.id)

  const v2: TwitterApi = event.context.twitterClientV2
  const clientV2 = await useTwitterAPI.authenticatedClientV2(v2)

  const clientV1 = await useTwitterAPI.authenticatedClientV1()

  const mediaId = await clientV1.v1.uploadMedia(Buffer.from(buffer!), { mimeType: EUploadMimeType.Jpeg })
  console.log('mediaId: ' + mediaId)

  const message = await clientV2.v2.tweet({ text: body.entry.twitterPost, media: { media_ids: [mediaId] } })

  console.log(message)

  return { data: 'success' }
})