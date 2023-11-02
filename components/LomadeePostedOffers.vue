<template>
  <div class="p-5 h-full bg-slate-400 flex flex-wrap gap-3">
    <ProductCard v-if="data" v-for="offer in data.data" :data="offer" />
  </div>
</template>

<script setup>

const { data, error } = await useFetch('https://www.melhores-compras.online/dev/api/offers?sort[0]=publishedAt%3Adesc&populate[0]=image')
// const { data, error } = await useFetch('https://www.melhores-compras.online/dev/api/offers/9?populate=*')

// console.log(JSON.stringify(data.value, null, 2))

if (error.value) error.value

</script>