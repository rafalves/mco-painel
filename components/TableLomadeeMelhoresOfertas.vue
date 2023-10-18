<template>
  <div>
    <DataTable showGridlines="" :value="melhoresOfertas" removableSort stripedRows tableStyle="min-width: 50rem">

      <Column field="id" header="ID Oferta" sortable />

      <Column field="category" header="Categoria" sortable>
        <template #body="slotProps">
          <p>{{ slotProps.data.category.id }} - {{ slotProps.data.category.name }}</p>
        </template>
      </Column>

      <Column field="name" header="Oferta" />

      <Column field="thumbnail" header="Imagem">
        <template #body="slotProps">
          <img :src="`${slotProps.data.thumbnail}`" class="w-[5rem] shadow-lg rounded" />
        </template>
      </Column>

      <Column field="price" header="Preço" sortable>
        <template #body="slotProps">
          <span>R$ {{ slotProps.data.price }}</span>
        </template>
      </Column>

      <Column field="priceFrom" header="Preço Anterior" sortable>
        <template #body="slotProps">
          <span>R$ {{ slotProps.data.priceFrom }} </span>
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
            </div>
          </div>
        </template>

      </Column>

      <template #header>
        <div class="flex flex-col">
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

const melhoresOfertas = ref([])

const errorResponse = ref('')
const isLoadingData = ref(false)
const paginationResponse = ref('')

isLoadingData.value = true

const { data, error, status } = await useFetch('https://api.lomadee.com/v3/149919724709334e079c5/offer/_bestsellers?size=30&sourceId=38011636')

if (error.value) errorResponse.value = error.value

if (status.value === 'success') {
  melhoresOfertas.value = data.value.offers ?? [];
  paginationResponse.value = data.value.pagination
  // console.log(JSON.stringify(data.value, null, 2)) 
  isLoadingData.value = false
}

isLoadingData.value = false


</script>  