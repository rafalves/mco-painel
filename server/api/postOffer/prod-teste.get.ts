interface ProductData {
  title: string
  image: string
}

const token = 'ceec9212cfd3312f6765f973b483eb271a9ba266241bd5cc71fb96354c62c0bb1148b7aca88c62e9a45a7a0010c1b34f7eda27b4aa701b5fd900d4248cbd17a9861e477ea209f8ee71085c70fed55e5cf9ffe924f51475bd87bba369fc3ba65524b071bc0c32234ccd03e8e3936af8a4f7da937dfe23395b45f93201fef65719'

export default defineEventHandler(async (event) => {

  console.log('entrou api')


  // let prod: Record<string, string | number> = {}
  let imageUrl = ""
  const formData = new FormData()
  let blobImage: Blob | null = null

  let prodId = Math.floor(Math.random() * 20) + 1

  const fakeData: ProductData | undefined = await $fetch(`https://fakestoreapi.com/products/${prodId}`)

  console.log(fakeData)

  // if (fakeData) {
  //   prod.name = fakeData.title
  //   prod.link = fakeData.image
  //   prod.url = fakeData.image
  //   imageUrl = fakeData.image
  // }

  const prod = {
    name: fakeData?.title,
    link: fakeData?.image,
    url: fakeData?.image
  };

  //   imageUrl = fakeData.image
  console.log(prod)
  console.log(imageUrl)

  if (imageUrl) {
    console.log('entrei no if da imagem')

    const dataURLtoBlob = async (imgUrl: string) => {
      const blob = await $fetch(imgUrl).catch((err) => {
        sendError(event, createError({ statusText: 'Internal Server Error blob', status: 500, data: { status: 500, message: err } }))
      })
      return blob
    }

    blobImage = await dataURLtoBlob(imageUrl) as Blob
  }
  console.log('blob: ' + blobImage)

  if (blobImage instanceof Blob) {

    console.log('dentro')
    formData.append('files.imagem', blobImage, `${prod.name}.jpg`)
    formData.append('data', JSON.stringify(prod));
    console.log('dentro 2')

    console.log(formData)


    // const data = await $fetch('http://localhost:1337/api/prod-testes/', {
    const res = await $fetch('http://localhost:1337/api/prod-testes/', {
      method: 'post',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    }).catch((err) => {
      console.log(err.data)
      sendError(event, createError({ statusText: 'Internal Server Error', status: 500, data: { status: 500, message: err } }))
    })

    console.log('antes do res')
    console.log(res)
    return res

  } else {
    setResponseStatus(event, 500, 'Internal Server Error')
    return { data: { status: 500, message: "Product image link error" } }
  }
})