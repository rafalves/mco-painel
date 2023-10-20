

export default defineEventHandler(async (event) => {
  const token = '76dbd8251896796724f26c2e893b4fd50f33788c95067e6226596d098f6127ab9511baab15540e560f08be28bb40116c6d3739f918abdbdd9a980333e5be3c1c3475b29f399b5935a77aba6a0bdba70973647a7127963609f5913de4c0ec4fd4ea521be759f90cae293159203ca2e84dc16e0de8a66d96d2c0dda25bb9e0c4c3';

  const dataURLtoBlob = async (imgUrl: string) => {
    const res = await $fetch(imgUrl)
    console.log(res)
    // const blob = await res.blob()
    return res
  }

  const body = await readBody(event)

  console.log(body)

  const formData = new FormData()
  const blobImage: Blob = await dataURLtoBlob(body.imgUrl) as Blob

  // console.log('blog valor')
  // console.log(blobImage)

  const data = {
    name: body.name,
    link: body.link
  };

  formData.append('files.imagem', blobImage, `${body.name}.jpg`)
  formData.append('data', JSON.stringify(data));

  const res = await $fetch('https://melhores-compras.online/dev/api/prod-testes', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  }).catch((err) => console.log(err.data))

  console.log('res')

  console.log(res)

  return {
    res: res
  }
})


