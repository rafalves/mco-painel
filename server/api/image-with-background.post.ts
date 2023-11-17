import { useSharp } from '~/server/utils/useSharp';

export default defineEventHandler(async (event) => {
  console.log('entrei')

  const body = await readBody(event)

  const image: Buffer | undefined = await useGetImage.buffer(body.image)

  if (!image) {
    createError({ statusCode: 500, statusMessage: 'Could not generate buffer from useGetImage' })
  }

  const resized = await useSharp.resize(image!, 200)
  const newImage: Buffer = await useSharp.withBackground(resized.data)

  const base64Image = newImage.toString('base64')

  return { image: base64Image }
})