import { OfferForm } from '@/types/Offer'

export default defineEventHandler(async (event) => {
  const { rafaelStrapiToken } = useRuntimeConfig(event)

  let offer: OfferForm | null = null
  const body = await readBody(event)
  const formData = new FormData()
  let blobImage: Blob | null = null

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
    const dataURLtoBlob = async (imgUrl: string) => {
      const blob = await $fetch(imgUrl).catch((err) => {
        sendError(event, createError({ statusText: 'Internal Server Error blob', status: 500, data: { status: 500, message: err } }))
      })
      return blob
    }
    blobImage = await dataURLtoBlob(body.image) as Blob
  }

  if (blobImage instanceof Blob) {
    formData.append('files.image', blobImage, `${offer.name}.jpg`)
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