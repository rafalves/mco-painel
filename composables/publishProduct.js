export async function publishFromLomadee(name, link, imgUrl) {
  console.log('inicio')
  console.log(name)
  console.log(link)
  console.log(imgUrl)
  console.log('fim')
 
  const { body } = await useFetch('/api/postOffer/lomadee', {
    method: 'post',
    body: { name: name, link: link, imgUrl: imgUrl}
  })
}
  // const formData = new FormData()
  // const blobImage = dataURLtoBlob(imgUrl)
  // const token = '76dbd8251896796724f26c2e893b4fd50f33788c95067e6226596d098f6127ab9511baab15540e560f08be28bb40116c6d3739f918abdbdd9a980333e5be3c1c3475b29f399b5935a77aba6a0bdba70973647a7127963609f5913de4c0ec4fd4ea521be759f90cae293159203ca2e84dc16e0de8a66d96d2c0dda25bb9e0c4c3';
  // const data = {
  //   name: name,
  //   link: link
  // };
  
  // formData.append('files', blobImage, `${name}.jpg`)
  // formData.append('data', JSON.stringify(data));

  // const { data: res, error } = await useFetch('https://melhores-compras.online/dev/api/prod-testes', {
  //   method: 'post',
  //   headers: { 'Authorization': `Bearer ${token}` },
  //   body: formData
  // })
  
  // console.log(JSON.stringify(res.value, null, 2)) 
  // if (error.value) {
  //   console.log(error.value)
  // }
// } 
 
const dataURLtoBlob = async (imgUrl) => {
  const { data } = await useFetch(imgUrl)
  const blob = await data.value.blob()
  return blob
}
// const dataURLtoBlob = (dataURL) => {
//   const byteString = atob(dataURL.split(',')[1]);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);

//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([ab], { type: 'image/png' }); // Substitua 'image/png' pelo tipo correto, se necessário
// }

export async function publishFromLomadee2(name, link, imgUrl) {
  console.log('inicio')
  console.log(name)
  console.log(link)
  console.log(imgUrl)
  console.log('fim')

  const formData = new FormData()
  const blobImage = dataURLtoBlob(imgUrl)
  const token = '76dbd8251896796724f26c2e893b4fd50f33788c95067e6226596d098f6127ab9511baab15540e560f08be28bb40116c6d3739f918abdbdd9a980333e5be3c1c3475b29f399b5935a77aba6a0bdba70973647a7127963609f5913de4c0ec4fd4ea521be759f90cae293159203ca2e84dc16e0de8a66d96d2c0dda25bb9e0c4c3';
  const data = {
    name: name,
    link: link
  };
  
  formData.append('files', blobImage, `${name}.jpg`)
  formData.append('data', JSON.stringify(data));

  const { data: res, error } = await useFetch('https://melhores-compras.online/dev/api/prod-testes', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  })
  
  console.log(JSON.stringify(res.value, null, 2)) 
  if (error.value) {
    console.log(error.value)
  }
} 
  