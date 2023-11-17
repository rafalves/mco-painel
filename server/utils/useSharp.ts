import sharp from 'sharp'
// import * as fs from 'fs'

export const useSharp = {
  getMetadata: async (image: Buffer): Promise<{ width: number, height: number, fail: boolean, success: boolean }> => {
    let data = { width: 0, height: 0, fail: false, success: false }

    try {
      const metadata = await sharp(image).metadata()
      console.log('Largura:', metadata.width);
      console.log('Altura:', metadata.height);
      data.width = metadata.width ?? 0
      data.height = metadata.height ?? 0
      data.success = true
    } catch (err) {
      console.log(err)
      data.fail = true
    }

    return data
  },

  resize: async (image: Buffer, width: number): Promise<{ data: Buffer, info: sharp.OutputInfo }> => {

    const {  data, info } = await sharp(image as Buffer).resize(width).toBuffer({ resolveWithObject: true })
    console.log(info)

    return {data:data, info: info}
  },

  withBackground: async (image: Buffer) => {
    let bgWidth = 700
    let bgHeight = 400
    let imageMetadata = await useSharp.getMetadata(image)
    const topValue = Math.round((bgHeight - imageMetadata.height) / 2)
    const leftValue = Math.round((bgWidth - imageMetadata.width) / 2)
    console.log('top: ' + topValue)
    console.log('left: ' + leftValue)
 
    const background = Buffer.alloc(bgWidth * bgHeight * 3).fill(255)
 
    const {data, info} = await sharp(background, {
      raw: {
        width: bgWidth,
        height: bgHeight,
        channels: 3,
      }
    }).composite([{ input: image, left: leftValue, top: topValue }]).webp().toBuffer({resolveWithObject: true})

    console.log(info)

    return data
  }
}


// const publicDirectory = './public';
// if (!fs.existsSync(publicDirectory)) {
  //   fs.mkdirSync(publicDirectory);
  // }
    
        // const name = `image-${Date.now()}.webp`
    
        // await sharp(background, {
        //   raw: {
        //     width: bgWidth,
        //     height: bgHeight,
        //     channels: 3,
        //   },
        // }).composite([{ input: image, left: (bgWidth - imageMetadata.width) / 2, top: (bgHeight - imageMetadata.height) / 2 }])
        //   .webp()
        //   .toFile(`./public/${name}`, (err, info) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log(info);
        //     }
        //   });
      // }