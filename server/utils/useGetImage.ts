export const useGetImage = {
  buffer: async (imageUrl: string): Promise<Buffer | undefined> => {
    const buffer = await $fetch(imageUrl, { responseType: "arrayBuffer" }).catch((err) => {
      console.log('buffer image erro')
      console.log('Fetch image error: ' + err)
      return undefined
    })
    return buffer as Buffer
  }
}