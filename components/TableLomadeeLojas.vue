<template>
  <div>

    <Toolbar>
      <template #start>
        <span class="mr-2">Buscar por ID da Categoria:</span>
        <InputText v-model="queryCategoryId" type="number" v-tooltip="'API não está funcionando'" />
        <span class="mx-2">Tem Ofertas?</span>
        <Checkbox v-model="queryHasOffer" :binary="true" />
      </template>

      <template #end>
        <Button label="Limpar" severity="secondary" class="mr-3" @click="clearSearchOptions" />
        <Button label="Buscar" severity="success" @click="searchData" />
      </template>
    </Toolbar>
    <div class="h-5" />

    <DataTable v-model:filters="filters" showGridlines="" :value="lojas" removableSort sortField="hasOffer"
      :sortOrder="-1" stripedRows filterDisplay="menu" tableStyle="min-width: 50rem"
      :globalFilterFields="['name', 'id', 'events']" :loading="isLoadingData">

      <template #header>
        <div class="flex justify-between">
          <p> Total {{ lojas ? lojas.length : 0 }} lojas</p>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Filtrar por ID ou Loja" />
          </span>
        </div>
      </template>

      <Column field="id" header="ID" sortable />
      <Column field="name" header="Loja" sortable />

      <Column header="Logo">
        <template #body="slotProps">
          <img :src="`${slotProps.data.thumbnail}`" class="w-[5rem] shadow-lg rounded" />
        </template>
      </Column>

      <Column header="Endereço">
        <template #body="slotProps">
          <NuxtLink :to="slotProps.data.link" target="_blank">link</NuxtLink>
        </template>
      </Column>

      <Column field="maxCommission" header="Comis Max" sortable>
        <template #body="slotProps">
          {{ (slotProps.data.maxCommission).toFixed(2) }}
        </template>
      </Column>

      <Column field="hasOffer" :showFilterMenu="true" header="Tem Oferta?" dataType="boolean" sortable
        style="min-width: 6rem">
        <template #body="{ data }">
          {{ data.hasOffer }}
        </template>
      </Column>

      <Column field="events" header="Eventos - Nome | Tipo | Max Comis" sortable>
        <template #body="{ data }">
          <div v-if="data.events.length >= 1">
            <template v-for="evento in data.events">
              <p>{{ evento.event }} | {{ evento.eventType }} | {{ (evento.commission).toFixed(2) }}</p>
            </template>
          </div>
          <div v-else>
            nao tem evento
          </div>
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
const queryCategoryId = ref(null)
const queryHasOffer = ref(true)

const lojas = ref([])

const errorMessage = ref('')
const isLoadingData = ref(false)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  id: { value: null, matchMode: FilterMatchMode.EQUALS },
});


const searchData = async () => {
  isLoadingData.value = true
  errorMessage.value = ""
  lojas.value = ([])

  const { data, error, status } = await useFetch(`${baseApi}${apiToken}/store/_all`, {
    query: {
      sourceId: publisherId,
      categoryId: queryCategoryId.value ? queryCategoryId.value : undefined,
      hasOffer: queryHasOffer.value ? queryHasOffer.value : undefined
    }
  })

  if (error.value) errorMessage.value = error.value.message

  if (status.value === 'success') {
    lojas.value = data.value.stores ?? [];
    // console.log(JSON.stringify(data.value, null, 2)) 
  }

  isLoadingData.value = false
}

const clearSearchOptions = () => {
  lojas.value = ([])
  queryCategoryId.value = null
  queryHasOffer.value = false
  errorMessage.value = ""
  isLoadingData.value = false
}
</script>