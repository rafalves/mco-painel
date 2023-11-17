import { OfferForm } from '@/types/Offer'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  console.log('entrei no post amazon')
  const { rafaelStrapiToken } = useRuntimeConfig(event)

  let offer: OfferForm | null = null
  const body = await readBody(event)
  const formData = new FormData()
  let bufferImage: Buffer | null = null

  offer = {
    name: body.name,
    price: typeof body.price === 'string' ? parseInt(body.price) : body.price,
    old_price: typeof body.old_price === 'string' ? parseInt(body.old_price) : body.old_price,
    discount: typeof body.discount === 'string' ? parseInt(body.discount) : body.discount,
    payment_method: body.payment_method,
    seller: body.seller,
    category: body.category,
    headline: body.headline,
    tags: body.tags,
    offer_source: body.offer_source,
    prod_link: body.prod_link,
    post_update: typeof body.post_update === 'boolean' ? body.post_update : false
  }

  if (body.image) {
    const dataURLtoBuffer = async (imgUrl: string) => {
      const buffer = await $fetch(imgUrl, { responseType: "arrayBuffer" }).catch((err) => {
        sendError(event, createError({ statusText: 'Internal Server Error buffer', status: 500, data: { status: 500, message: err } }))
      })
      return buffer
    }
    bufferImage = await dataURLtoBuffer(body.image) as Buffer
  }

  const resized = await sharp(bufferImage as Buffer).resize(200).toBuffer({ resolveWithObject: true })
  const blob = new Blob([resized.data], { type: 'image/jpeg' });

  // if (bufferImage instanceof Buffer) {
  if (resized) {
    formData.append('files.image', blob, `${offer.name}.jpg`)
    formData.append('data', JSON.stringify(offer));

    const data = await $fetch('https://melhores-compras.online/dev/api/offers', {
      method: 'post',
      headers: { 'Authorization': `Bearer ${rafaelStrapiToken}` },
      body: formData
    }).catch((err) => {
      console.log(err.data)
      sendError(event, createError({ statusText: 'Internal Server Error', status: 500, data: { status: 500, message: err } }))
    })

    console.log("Data posted: ")
    console.log(data)

    return data

  } else {
    setResponseStatus(event, 500, 'Internal Server Error')
    return { data: { status: 500, message: "Product image link error" } }
  }

})