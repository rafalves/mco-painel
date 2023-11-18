export const useStrapiApi = {
  getImg2Url: async (id: number): Promise<Buffer | void> => {

    const baseUrl = 'https://www.melhores-compras.online/dev'

    const offerData: any = await $fetch(`https://melhores-compras.online/dev/api/offers/${id}?populate=*`)

    const url = offerData.data.attributes.image.data[1].attributes.url

    console.log(`${baseUrl}${url}`)
    const buffer: Buffer | undefined = await useGetImage.buffer(`${baseUrl}${url}`)

    if (buffer) {
      console.log('é buffer')
      return buffer
    }
  }
}