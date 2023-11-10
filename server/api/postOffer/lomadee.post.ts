const token = 'ceec9212cfd3312f6765f973b483eb271a9ba266241bd5cc71fb96354c62c0bb1148b7aca88c62e9a45a7a0010c1b34f7eda27b4aa701b5fd900d4248cbd17a9861e477ea209f8ee71085c70fed55e5cf9ffe924f51475bd87bba369fc3ba65524b071bc0c32234ccd03e8e3936af8a4f7da937dfe23395b45f93201fef65719'

export default defineEventHandler(async (event) => {
  const { rafaelStrapiToken } = useRuntimeConfig(event)

  const body = await readBody(event)
  let prod: Record<string, string | number> = {}

  if (body.name) prod.name = body.name
  if (body.price) prod.price = body.price
  if (body.priceFrom) prod.old_price = body.priceFrom
  if (body.discount) prod.discount = parseInt(body.discount, 10)
  if (body.store_name) prod.seller = body.store_name
  if (body.advertiserCategory) prod.category = body.advertiserCategory
  if (body.link) prod.prod_link = body.link
  prod.offer_source = 'lomadee'
  // if (body.store_thumbnail) prod.store_thumbnail = body.store_thumbnail

  const formData = new FormData()

  let blobImage: Blob | null = null

  if (body.thumbnail) {

    const dataURLtoBlob = async (imgUrl: string) => {
      const blob = await $fetch(imgUrl).catch((err) => {
        sendError(event, createError({ statusText: 'Internal Server Error blob', status: 500, data: { status: 500, message: err } }))
      })
      return blob
    }
    blobImage = await dataURLtoBlob(body.thumbnail) as Blob
  }


  if (blobImage instanceof Blob) {

    console.log('dentro')
    formData.append('files.image', blobImage, `${body.name}.jpg`)
    formData.append('data', JSON.stringify(prod));
    console.log('dentro 2')

    const data = await $fetch('https://melhores-compras.online/dev/api/offers', {
      method: 'post',
      headers: { 'Authorization': `Bearer ${rafaelStrapiToken}` },
      // headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    }).catch((err) => {
      console.log(err.data)
      sendError(event, createError({ statusText: 'Internal Server Error', status: 500, data: { status: 500, message: err } }))
    })

    console.log(data)
    return data

  } else {
    setResponseStatus(event, 500, 'Internal Server Error')
    return { data: { status: 500, message: "Product image link error" } }
  }



})