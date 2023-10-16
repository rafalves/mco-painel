<template>
  <div class="">
    <div class="mx-auto max-w-[58rem] font-sans ">

      <!-- <ProductCard imagem_url="https://i.promobit.com.br/static/p/300/529279489316971519156083095810.jpg" name="notebook"
        link="https://www.promobit.com.br/oferta/notebook-acer-aspire-3-intel-core-i5-1235u-8gb-ram-ssd-256gb-156-full-hd-windows-11-prata-a315-59-51yg-1520830/" /> -->

      <div>
        <h1>Formulário de envio de post</h1>
        <form @submit.prevent="submit">
          <input type="text" v-model="formulario.name" placeholder="Nome" required />
          <input type="text" v-model="formulario.link" placeholder="Link" required />
          <input type="text" v-model="formulario.url" placeholder="URL" required />

          <img :src="previewImage" />
          <input type="file" accept="image/**" @change=loadImage>
          <!-- <button @click="uploadImage">Enviar</button> -->
          <br>
          <button type="submit">Enviar</button>


        </form>
      </div>




    </div>
  </div>
</template>

<script setup lang="ts">
const token = ref('76dbd8251896796724f26c2e893b4fd50f33788c95067e6226596d098f6127ab9511baab15540e560f08be28bb40116c6d3739f918abdbdd9a980333e5be3c1c3475b29f399b5935a77aba6a0bdba70973647a7127963609f5913de4c0ec4fd4ea521be759f90cae293159203ca2e84dc16e0de8a66d96d2c0dda25bb9e0c4c3')

const previewImage = ref('')

const formulario = reactive({
  name: '',
  link: '',
  url: '',
  // imagem: '',
});

const loadImage = (e: any) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (e: any) => {
    previewImage.value = e.target?.result
  }
}

// const uploadImage = async (value: any) => {
//   const formDataImg = new FormData()
//   const blobImage = dataURLtoBlob(previewImage.value);
//   formDataImg.append('files', blobImage, '1.png')

//   const { data } = await useFetch('https://melhores-compras.online/dev/api/upload', {
//     method: 'post',
//     headers: { 'Authorization': `Bearer ${token.value}` },
//     body: formDataImg
//   })
//   console.log(JSON.stringify(data.value, null, 2))
// }


const submit = async (value: any) => {
  const blobImage = dataURLtoBlob(previewImage.value);
  console.log(blobImage)

  const dataToSent = {}
  const formData = new FormData()



  // for (const [key, value] of Object.entries(formulario)) {

  //   formData.append(key, value);
  // }

  console.log(formulario)

  for (const [key, value] of formData.entries()) {
    console.log(`Chave: ${key}, Valor: ${value}`);
  }
  const data = {
    name: formulario.name,
    link: formulario.link,
    url: formulario.url
  };

  formData.append('files.imagem', blobImage, '1.png')
  formData.append('data', JSON.stringify(data));
  // formData.append('data', JSON.stringify(data));
  // const postData = { data: formData }

  const { data: res } = await useFetch('https://melhores-compras.online/dev/api/prod-testes', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token.value}` },
    body: formData
  })
  console.log(JSON.stringify(res.value, null, 2))
}


const dataURLtoBlob = (dataURL: any) => {
  const byteString = atob(dataURL.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: 'image/png' }); // Substitua 'image/png' pelo tipo correto, se necessário
}
</script>
 