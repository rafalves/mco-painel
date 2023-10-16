<template>
  <div>

    <Toolbar>
      <template #start>
        <div class="flex flex-wrap gap-3 items-center">

          <div class="flex">
            <span class="mx-2">Tipo de Busca:</span>
            <RadioButton v-model="categorySearchType" name="categorySearchType" value="_all" />
            <span>Tudo</span>
          </div>
          <div class="flex">
            <RadioButton v-model="categorySearchType" value="_id" name="categorySearchType" />
            <span>ID</span>
          </div>
          <div class="flex">
            <RadioButton v-model="categorySearchType" value="_search" name="categorySearchType" />
            <span>Termo</span>
          </div>

          <InputText v-model="categoryInputTextFieldValue" :disabled="categoryInputTextFieldDisabled"
            :type="categoryInputTextFieldType" :placeholder="categoryInputTextFieldPlaceholder"
            @keypress.enter="searchData" />

          <span>Tem Ofertas?</span>
          <Checkbox v-model="queryHasOffer" :binary="true" />

        </div>
      </template>

      <template #end>
        <Button label="Limpar" severity="secondary" class="mr-3" @click="clearSearchOptions" />
        <Button label="Buscar" severity="success" @click="searchData" />
      </template>
    </Toolbar>

    <div class="h-5" />

    <DataTable v-model:filters="filters" showGridlines="" :value="categorias" removableSort sortField="hasOffer"
      :sortOrder="-1" stripedRows filterDisplay="menu" tableStyle="min-width: 50rem" :globalFilterFields="['name', 'id']"
      :loading="isLoadingData">

      <template #header>
        <div class="flex justify-between">
          <p> Total {{ categorias ? categorias.length : 0 }} lojas</p>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Filtrar por ID ou Categoria" />
          </span>
        </div>
      </template>

      <Column field="id" header="Categoria ID" sortable />
      <Column field="name" header="Categoria" sortable />

      <Column field="hasOffer" :showFilterMenu="true" header="Tem Oferta?" dataType="boolean" sortable
        style="min-width: 6rem">
        <template #body="{ data }">
          {{ data.hasOffer }}
        </template>
      </Column>

      <template #loadingicon>
        <p class="text-3xl text-white mr-2">Carregando dados...</p>
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem" />
      </template>

      <template #footer v-if="errorMessage">
        <p>Erro:</p>
        {{ errorMessage }}
      </template>

    </DataTable>

  </div>
</template>

<script setup>
import { FilterMatchMode } from 'primevue/api';

const publisherId = '23174711'
const apiToken = '169695979229290a4e48a'
const baseApi = 'https://api.lomadee.com/v3/'

// lojas QueryString
const queryStoreId = ref(null)
const queryHasOffer = ref(true)
const querySearchByKeyword = ref(false)

const categorias = ref([])

const errorMessage = ref('')
const isLoadingData = ref(false)

const categorySearchType = ref('_all')
const categoryPath = ref('false')

const categoryInputTextFieldDisabled = ref('true')
const categoryInputTextFieldType = ref('text')
const categoryInputTextFieldPlaceholder = ref('text')
const categoryInputTextFieldValue = ref('')

watchEffect(() => {
  if (categorySearchType.value === '_all') {
    categoryPath.value = categorySearchType.value
    categoryInputTextFieldDisabled.value = true
    categoryInputTextFieldPlaceholder.value = ""
    categoryInputTextFieldValue.value = ""
    queryStoreId.value = null
    queryHasOffer.value = true

  }
  if (categorySearchType.value === '_id') {
    categoryInputTextFieldDisabled.value = false
    categoryInputTextFieldType.value = 'number'
    categoryInputTextFieldPlaceholder.value = "Digite o ID"
    categoryPath.value = `${categorySearchType.value}/${categoryInputTextFieldValue.value}`
  }
  if (categorySearchType.value === '_search') {
    categoryPath.value = categorySearchType.value
    categoryInputTextFieldDisabled.value = false
    categoryInputTextFieldType.value = 'text'
    categoryInputTextFieldPlaceholder.value = "Digite o termo da busca"
    querySearchByKeyword.value = categoryInputTextFieldValue.value
  }
})


const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
});


const searchData = async () => {
  isLoadingData.value = true
  errorMessage.value = ""
  categorias.value = ([])

  const { data, error, status } = await useFetch(`${baseApi}${apiToken}/category/${categoryPath.value}`, {
    params: {
      sourceId: publisherId,
      storeId: queryStoreId.value ? queryStoreId.value : undefined,
      hasOffer: queryHasOffer.value ? queryHasOffer.value : undefined,
      keyword: querySearchByKeyword.value ? querySearchByKeyword.value : undefined
    }
  })

  if (error.value) errorMessage.value = error.value.message

  if (status.value === 'success') {
    categorias.value = data.value.categories ?? [];
    // console.log(JSON.stringify(data.value, null, 2)) 
    isLoadingData.value = false
  }

  isLoadingData.value = false
}

const clearSearchOptions = () => {
  categorias.value = ([])
  categorySearchType.value = '_all'
  categoryInputTextFieldType.value = ""
  categoryInputTextFieldValue.value = ""
  queryStoreId.value = null
  queryHasOffer.value = true
  errorMessage.value = ""
  isLoadingData.value = false
}
</script>