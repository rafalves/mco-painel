import { EUploadMimeType, TwitterApi } from 'twitter-api-v2';
import { useGetImage } from '~/server/utils/useGetImage';

export default defineEventHandler(async (event) => {
  console.log('entrou')

  const imageUrl = 'https://melhores-compras.online/dev/uploads/Untitled_a9fca56a59.jpg'
  const buffer = await useGetImage.buffer(imageUrl)
  if (!buffer) {
    console.log('erro no buffer')
    return
  }

  const v2: TwitterApi = event.context.twitterClientV2
  const clientV2 = await useTwitterAPI.authenticatedClientV2(v2)

  const clientV1 = await useTwitterAPI.authenticatedClientV1()

  const mediaId = await clientV1.v1.uploadMedia(Buffer.from(buffer), { mimeType: EUploadMimeType.Jpeg })
  console.log('mediaId: ' + mediaId)

  const message = await clientV2.v2.tweet({ text: 'Testando Twitter API, upload image', media: { media_ids: [mediaId] } })

  console.log(message)

})