<template>
  <div>

    <div class="flex flex-col items-center bg-white w-60 h-80 gap-4 rounded-md shadow-md">
      <div class="flex justify-center mt-3">
        <img sizes=" 120px, 176px" :src="imagem_url" class="h-[176px] w-[176px]" height="120" width="120">
      </div>
      <p>{{ name }}</p>
      <NuxtLink class="p-5 bg-orange-500 rounded" :to="link" target="_blank">
        Comprar
      </NuxtLink>
    </div>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  link: string,
  imagem_url: string,
  name: string
}>()
</script>