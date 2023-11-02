<template>
  <div class="p-3">
    amazon page
    <div class="flex flex-col items-center gap-3 p-5">

      <InputText type="text" v-model="inputProdLink" placeholder="Link do Produto Afiliado" class="w-full md:w-fit" />

      <div class="flex justify-center items-center gap-3">
        <Button label="Buscar" @click="getProduct()" />
        <Button v-if="offer" icon="pi pi-refresh" @click="refreshData()" />
      </div>

      <div>
        <div v-if="isLoading" class="flex justify-center ">
          <i class="pi pi-spin pi-spinner mt-3" style="color: slateblue; font-size: 2rem"></i>
        </div>

        <div v-if="offer" class="flex flex-col gap-7 w-screen md:w-full p-3">

          <div class="flex justify-center">
            <img :src="offer.image" class="w-[200px] items-center justify-center text-center" />
          </div>

          <span class="p-float-label">
            <Textarea v-model="offer.name" autoResize rows="1" severity="info" class="w-full h-full" />
            <label>Nome</label>
          </span>

          <span class="p-float-label">
            <InputText type="text" v-model="offer.category" class="w-full md:w-fit" />
            <label for="number-input">Categoria</label>
          </span>

          <span class="p-float-label">
            <InputNumber v-model="offer.old_price" mode="currency" currency="BRL" locale="pt-BR" class="w-fit" />
            <label for="number-input">De</label>
          </span>

          <span class="p-float-label">
            <InputNumber v-model="offer.price" mode="currency" currency="BRL" locale="pt-BR" class="w-fit" />
            <label for="number-input">Para</label>
          </span>

          <span class="p-float-label">
            <InputNumber v-model="offer.discount" inputId="integeronly" suffix="%" class="w-fit" />
            <label for="number-input">Desconto</label>
          </span>

          <span class="p-float-label">
            <InputText type="text" v-model="offer.seller" class="w-full md:w-fit" />
            <label for="number-input">Loja</label>
          </span>

          <span class="p-float-label">
            <InputText type="text" v-model="offer.offer_source" class="w-full md:w-fit" />
            <label for="number-input">Afiliado</label>
          </span>

          <span class="p-float-label">
            <InputText type="text" v-model="offer.prod_link" class="w-full md:w-fit" />
            <label for="number-input">Link do Produto</label>
          </span>

          <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Destaque" />
              <label for="headline6" class="ml-2">Destaque</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Oferta" />
              <label for="headline5" class="ml-2">Oferta</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Super Oferta" />
              <label for="headline1" class="ml-2">Super Oferta</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Menor Preço" />
              <label for="headline2" class="ml-2">Menor Preço</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Relâmpago" />
              <label for="headline3" class="ml-2">Relâmpago</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="headline" name="headline" value="Premium" />
              <label for="headline4" class="ml-2">Premium</label>
            </div>
          </div>

          <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center">
              <Checkbox v-model="tags" name="tags" value="Pix" />
              <label for="tag1" class="ml-2"> Pix </label>
            </div>
            <div class="flex align-items-center">
              <Checkbox v-model="tags" name="tags" value="Frete Grátis" />
              <label for="tag2" class="ml-2"> Frete Grátis </label>
            </div>
            <div class="flex align-items-center">
              <Checkbox v-model="tags" name="tags" value="Internacional" />
              <label for="tag3" class="ml-2"> Internacional </label>
            </div>
            <div class="flex align-items-center">
              <Checkbox v-model="tags" name="tags" value="Parcelado" />
              <label for="tag4" class="ml-2"> Parcelado </label>
            </div>
            <div class="flex align-items-center">
              <Checkbox v-model="tags" name="tags" value="Cashback" />
              <label for="tag4" class="ml-2"> Cashback </label>
            </div>
          </div>

          <Button label="Postar" @click="postOffer" />


        </div>
        <div v-if="errorStatus">
          {{ errorStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const inputProdLink = ref('https://amzn.to/3Qmja2n')
const isLoading = ref(false)
const errorStatus = ref('')
const offer = ref('')
const dataRaw = ref('')
const headline = ref('')
const tags = ref([])

async function getProduct() {
  offer.value = ''
  dataRaw.value = ''
  isLoading.value = true

  const { data, status, error } = await useFetch('/api/postOffer/amazonScrape', {
    method: 'POST',
    body: {
      link: inputProdLink
    }
  })

  isLoading.value = false

  if (error.value) {
    offer.value = {}
    console.log(error.value)
    errorStatus.value = error.value
  }

  if (status.value === 'success') {
    offer.value = {}
    dataRaw.value = JSON.parse(JSON.stringify(data.value));
    offer.value = data.value
    errorStatus.value = ''
    headline.value = offer.value.headline
    console.log('Scrape Data: ' + JSON.stringify(dataRaw.value, null, 2))
  }
}

function refreshData() {
  offer.value = JSON.parse(JSON.stringify(dataRaw.value))
}

async function postOffer() {
  console.log('Data be posted: ' + JSON.stringify(offer.value, null, 2))

  const { data: postData, status, error } = await useFetch('/api/postOffer/amazon', {
    method: 'POST',
    body: offer.value
  })

  if (error.value) {
    console.log(error.value)
  }

  if (status.value === 'success') {
    console.log('Data sucesso: ' + postData.value)
  }
}

watchEffect(() => {
  if (offer.value !== '') {
    offer.value.headline = headline.value
    offer.value.tags = tags.value.join(', ');
  }
})


</script>