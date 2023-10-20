<template>
  <div>

    <Toolbar>
      <template #start>
        <div class="flex flex-col gap-2">

          <div class="flex flex-wrap gap-3 items-center">
            <span>Tipo de Busca -</span>
            <div class="flex gap-2 items-center" v-tooltip="'digite o id de uma categoria'">
              <span>ID Categoria:</span>
              <RadioButton v-model="searchType" name="searchType" value="_category" />
            </div>

            <div class="flex gap-2 items-center" v-tooltip="'digite o id de uma oferta e o id de uma loja'">
              <span>Oferta / Loja:</span>
              <RadioButton v-model="searchType" value="_id" name="searchType" class="mr-2" />
            </div>

            <div class="flex gap-2 items-center" v-tooltip="'digite uma palavra chave para a busca'">
              <span>Por Palavra:</span>
              <RadioButton v-model="searchType" value="_search" name="searchType" class="mr-2" />
            </div>

            <div class="flex gap-2 items-center" v-tooltip="'digite uma palavra chave para a busca'">
              <span>ID Loja:</span>
              <RadioButton v-model="searchType" value="_store" name="searchType" class="mr-2" />
            </div>
          </div>

          <div class="flex gap-2 items-center">

            <div v-if="searchType === '_category'" class="flex flex-col gap-2">

              <div class="flex gap-2 items-center">
                <span>Página:</span>
                <InputText class="w-24" v-model="queryPage" type="number" @keypress.enter="searchData" />
                <span>ID Categ</span>
                <InputText v-if="searchType === '_category'" class="w-24 inputRequired" v-model="inputCategoryId"
                  type="number" @keypress.enter="searchData" />
              </div>

              <div class="flex gap-2 items-center">
                <span>Codigo Loja:</span>
                <InputText class="w-24 inputOptional" v-model="queryStoreId" type="number" @keypress.enter="searchData" />
                <span>Preç Min:</span>
                <InputText class="w-24 inputOptional" v-model="queryMinPrice" type="number"
                  @keypress.enter="searchData" />
                <span>Preç Max:</span>
                <InputText class="w-24 inputOptional" v-model="queryMaxPrice" type="number"
                  @keypress.enter="searchData" />
              </div>

              <div class="flex flex-wrap gap-3 items-center">
                <span>Filtrar por -</span>

                <div class="flex gap-2 items-center">
                  <span>Nenhum:</span>
                  <RadioButton v-model="querySort" name="querySort" value="none" />
                </div>

                <div class="flex gap-2 items-center"
                  v-tooltip="'ordena pelo menor desconto, api não ordena pelo maior desconto'">
                  <span>Desconto:</span>
                  <RadioButton v-model="querySort" name="querySort" value="discount.Asc" />
                </div>

                <div class="flex gap-2 items-center" v-tooltip="'ordena pelo menor preço'">
                  <span>Preço:</span>
                  <RadioButton v-model="querySort" name="querySort" value="price" />
                </div>
              </div>
            </div>

            <div v-if="searchType === '_id'" class="flex gap-2 items-center">
              <span>ID Oferta:</span>
              <InputText class="w-24 inputRequired" v-model="offerId" type="number" @keypress.enter="searchData" />
              <span>ID Loja:</span>
              <InputText class="w-24 inputRequired" v-model="queryStoreId" type="number" @keypress.enter="searchData" />
            </div>

            <div v-if="searchType === '_search'" class="flex flex-col gap-2">
              <div class="flex item gap-2 items-center">
                <span>Página:</span>
                <InputText class="w-24" v-model="queryPage" type="number" @keypress.enter="searchData" />
                <span>Termo:</span>
                <InputText v-model="queryKeyword" type="text" @keypress.enter="searchData"
                  placeholder="Digite uma palavra chave" class="inputRequired" />

              </div>

              <div class="flex item gap-2 items-center">
                <span>ID Categoria(s):</span>
                <InputText class="w-24 inputOptional" v-model="queryCategoriesId" type="number"
                  @keypress.enter="searchData" v-tooltip="'ID de 1 ou mais categorias separadas por virgula'" />
                <span>ID Loja:</span>
                <InputText class="w-24 inputOptional" v-model="queryStoreId" type="number" @keypress.enter="searchData" />
                <span>Preç Min:</span>
                <InputText class="w-24 inputOptional" v-model="queryMinPrice" type="number"
                  @keypress.enter="searchData" />
                <span>Preç Max:</span>
                <InputText class="w-24 inputOptional" v-model="queryMaxPrice" type="number"
                  @keypress.enter="searchData" />
                <span>Categorias Filhas?</span>
                <Checkbox v-model="querywithChildrenCategories" :binary="true" class="inputOptional" />
              </div>
            </div>

            <div v-if="searchType === '_store'" class="flex flex-col gap-2">

              <div class="flex gap-2 items-center">
                <span>Página:</span>
                <InputText class="w-24" v-model="queryPage" type="number" @keypress.enter="searchData" />
                <span>ID Loja:</span>
                <InputText class="w-24 inputRequired" v-model="queryStoreId" type="number" @keypress.enter="searchData" />
              </div>

              <div class="flex gap-2 items-center">

                <span>ID Categoria(s):</span>
                <InputText class="w-24 inputOptional" v-model="queryCategoriesId" type="number"
                  @keypress.enter="searchData" v-tooltip="'ID de 1 ou mais categorias separadas por virgula'" />
                <span>Preç Min:</span>
                <InputText class="w-24 inputOptional" v-model="queryMinPrice" type="number"
                  @keypress.enter="searchData" />
                <span>Preç Max:</span>
                <InputText class="w-24 inputOptional" v-model="queryMaxPrice" type="number"
                  @keypress.enter="searchData" />
                <span>Categorias Filhas?</span>
                <Checkbox v-model="querywithChildrenCategories" :binary="true" class="inputOptional" />
              </div>
              <div class="flex flex-wrap gap-3 items-center">
                <span>Filtrar por -</span>

                <div class="flex gap-2 items-center">
                  <span>Nenhum:</span>
                  <RadioButton v-model="querySort" name="querySort" value="none" />
                </div>

                <div class="flex gap-2 items-center"
                  v-tooltip="'ordena pelo menor desconto, api não ordena pelo maior desconto'">
                  <span>Desconto:</span>
                  <RadioButton v-model="querySort" name="querySort" value="discount.Asc" />
                </div>

                <div class="flex gap-2 items-center" v-tooltip="'ordena pelo menor preço'">
                  <span>Preço:</span>
                  <RadioButton v-model="querySort" name="querySort" value="price" />
                </div>
              </div>

            </div>
          </div>



        </div>
      </template>

      <template #end>
        <div class="flex justify-end">
          <Button label="Limpar" severity="secondary" class="mr-3" @click="clearSearchOptions" />
          <Button label="Buscar" severity="success" @click="searchData" />
        </div>
      </template>
    </Toolbar>

    <div class="h-5" />

    <DataTable v-model:filters="filters" showGridlines="" :value="ofertas" removableSort sortField="hasOffer"
      :sortOrder="-1" stripedRows filterDisplay="menu" tableStyle="min-width: 50rem" :globalFilterFields="['name', 'id']"
      :loading="isLoadingData">

      <Column field="id" header="Categoria ID" sortable />

      <Column field="category" header="Categoria" sortable>
        <template #body="slotProps">
          <p>{{ slotProps.data.category.id }} - {{ slotProps.data.category.name }}</p>

        </template>
      </Column>

      <Column field="name" header="Oferta" sortable />

      <Column field="thumbnail" header="Imagem" sortable>
        <template #body="slotProps">
          <img :src="`${slotProps.data.thumbnail}`" class="w-[5rem] shadow-lg rounded" />
        </template>
      </Column>

      <Column field="price" header="Preço" sortable>
        <template #body="slotProps">
          <span>R$ {{ slotProps.data.price }}</span>
        </template>
      </Column>

      <Column field="discount" header="Desconto" sortable>
        <template #body="slotProps">
          <span> {{ slotProps.data.discount }} %</span>
        </template>
      </Column>

      <Column field="link" header="Link" sortable>
        <template #body="slotProps">
          <p>
            <NuxtLink :to="slotProps.data.link" target="_blank">link</NuxtLink>
          </p>
        </template>
      </Column>

      <Column field="store" header="Loja" sortable>
        <template #body="slotProps">
          <div class="flex items-center">
            <div class="w-[5rem]">
              <img :src="`${slotProps.data.store.thumbnail}`" class="w-[5rem] shadow-lg rounded" />
            </div>
            <div>
              <p>ID: {{ slotProps.data.store.id }} </p>
              <p>Nome: {{ slotProps.data.store.name }} </p>
              <p>Link da Loja: <NuxtLink :to="slotProps.data.store.link" target="_blank">link</NuxtLink>
              </p>

              <!-- não sei o que são esses campos -->
              <!-- <p>Visivel: {{ slotProps.data.store.invisible }} </p> -->
              <!-- <p>Permissão: {{ slotProps.data.store.needPermission }} </p> -->
            </div>
          </div>
        </template>
      </Column>

      <Column header="Publicar">
        <template #body="slotProps">
          <Button label="Publicar Oferta" @click="publishOffer(
            slotProps.data.name, slotProps.data.link, slotProps.data.thumbnail)"></Button>
        </template>
      </Column>

      <!-- não sei o que este campo faz -->
      <!-- <Column field="installment" header="installment" sortable /> -->

      <template #header>
        <div class="flex flex-col">
          <div class="flex justify-between">
            <p> Total {{ ofertas ? ofertas.length : 0 }} lojas</p>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Filtrar por ID ou Categoria" />
            </span>
          </div>

          <div v-if="paginationResponse">
            <p>Página: {{ paginationResponse.page }}</p>
            <p>Total de Páginas: {{ paginationResponse.totalPage }}</p>
            <p>Itens: {{ paginationResponse.size }}</p>
            <p>Itens Total: {{ paginationResponse.totalSize }}</p>

          </div>

        </div>
      </template>
      <template #loadingicon>
        <p class="text-3xl text-white mr-2">Carregando dados...</p>
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem" />
      </template>

      <template #footer v-if="errorResponse">
        <p>Erro:</p>
        <p>{{ errorResponse.message }}</p>
        <p>Informações da Requisição:</p>
        <p>Código: {{ errorResponse.statusCode }}</p>
        <p>Status: {{ errorResponse.data.requestInfo.status }}</p>
        <p>Message: {{ errorResponse.data.requestInfo.message }}</p>

      </template>

    </DataTable>

  </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';
// import { publishFromLomadee } from '#imports';

const publisherId = '23174711'
const apiToken = '169695979229290a4e48a'
const baseApi = 'https://api.lomadee.com/v3/'
// size = tamanho dos resultados retornados maximo = 100
const querySize = 100

// lojas QueryString
const queryStoreId = ref(null)
const queryKeyword = ref(false)
const queryPage = ref(1)
const queryMaxPrice = ref('')
const queryMinPrice = ref('')
const queryCategoriesId = ref('')
const querywithChildrenCategories = ref(false)
const querySort = ref('none')

const ofertas = ref([])

const errorResponse = ref('')
const isLoadingData = ref(false)
const paginationResponse = ref('')

const searchType = ref('_category')
const offerPath = ref('')
const offerId = ref('')

const inputCategoryId = ref(0)

watchEffect(() => {
  if (searchType.value === '_category') {
    offerPath.value = `${searchType.value}/${inputCategoryId.value}`

    offerId.value = ''
    queryKeyword.value = ''
    querywithChildrenCategories.value = false
  }
  if (searchType.value === '_id') {
    offerPath.value = `${searchType.value}/${offerId.value}`

    queryKeyword.value = ''
    querywithChildrenCategories.value = false
  }
  if (searchType.value === '_search') {
    offerPath.value = searchType.value
  }
  if (searchType.value === '_store') {
    offerPath.value = `${searchType.value}/${queryStoreId.value}`

    offerId.value = ''
    queryKeyword.value = ''
    querywithChildrenCategories.value = false
  }
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
});


const searchData = async () => {
  isLoadingData.value = true
  errorResponse.value = ""
  paginationResponse.value = ""
  ofertas.value = ([])


  const { data, error, status } = await useFetch(`${baseApi}${apiToken}/offer/${offerPath.value}`, {
    params: {
      storeId: queryStoreId.value ? queryStoreId.value : undefined,
      keyword: queryKeyword.value ? queryKeyword.value : undefined,
      size: querySize,
      page: queryPage.value ? queryPage.value : 1,
      maxPrice: queryMaxPrice.value ? queryMaxPrice.value : undefined,
      minPrice: queryMinPrice.value ? queryMinPrice.value : undefined,
      sort: querySort.value !== 'none' ? querySort.value : undefined,
      withChildrenCategories: querywithChildrenCategories.value ? querywithChildrenCategories.value : undefined,
      sourceId: publisherId,
    }
  })

  if (error.value) errorResponse.value = error.value

  if (status.value === 'success') {
    ofertas.value = data.value.offers ?? [];
    paginationResponse.value = data.value.pagination
    // console.log(JSON.stringify(data.value, null, 2)) 
    isLoadingData.value = false
  }

  isLoadingData.value = false
}

const clearSearchOptions = () => {
  ofertas.value = ([])
  isLoadingData.value = false
  paginationResponse.value = ""
  errorResponse.value = ""
  inputCategoryId.value = 0
  queryStoreId.value = null
  queryPage.value = 1
  queryMinPrice.value = ''
  queryMaxPrice.value = ''
  queryKeyword.value = ''
  querySort.value = 'none'
}

const publishOffer = async (name, link, imgUrl) => {
  console.log('inicio')
  console.log(name)
  console.log(link)
  console.log(imgUrl)
  console.log('fim')

  const { data } = await useFetch('/api/postOffer/lomadee', {
    method: 'post',
    body: { name: name, link: link, imgUrl: imgUrl }
  })

  console.log('retorno do metodo post')
  console.log(data.value)
}

</script> 

<style scoped>
.inputRequired {
  @apply border-green-300 hover:border-green-500
}

.inputOptional {
  @apply border-yellow-300 hover:border-yellow-500
}
</style>