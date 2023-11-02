<template>
  <div class="p-0 flex flex-col w-60 h-[360px] rounded-md shadow-md bg-white font-poppins">
    <div class=" flex mx-2 gap-1 hover:underline">
      <Icon name="mdi:tag" color="#6B21A8" class="mt-1" />
      <span class="font-medium text-purple-800 line-clamp-1">{{ category(props.data.attributes.category) }}</span>
    </div>
    <div class="flex justify-center">
      <NuxtLink :to="props.data.attributes.prod_link" target="_blank">
        <img sizes="(max-width: 768px) 120px, 176px"
          :src="`${baseUrlUploads}${props.data.attributes.image.data[0].attributes.url}`" :srcset="imgSrcset"
          class="h-[120px] w-[120px] md:h-[176px] md:w-[176px] rounded-md" loading="lazy" :alt="imgAlt">
      </NuxtLink>
    </div>
    <div class="bg-slate-200 h-[1px] mx-2" />
    <div class="mx-2 my-0">

      <div class="h-5">
        <p v-if="props.data.attributes.old_price" class="font-semibold text-sm my-0 text-slate-500">{{
          (props.data.attributes.old_price).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }) }}</p>
      </div>
      <p class="text-purple-800 font-bold text-xl my-0">{{
        (props.data.attributes.price).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        }) }}</p>
      <p class="text-purple-800 font-medium my-0 hover:text-purple-900 line-clamp-3 h-[75px] ">
        {{
          props.data.attributes.name
        }}</p>
      <div class="bg-slate-200 h-[1px] " />
      <div class="flex justify-between">
        <p class="my-0 font-semibold">{{ props.data.attributes.seller }}</p>
        <div v-if="likes > 0" class="">
          <Icon name="iconamoon:heart-duotone" @mouseover="" color="#4D5765" class="-mt-1 mr-1 animate-pulse"
            size="20px" />
          <span class="font-semibold">{{ likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, required: true },
})

// console.log(JSON.stringify(props.data, null, 2))

const baseUrlUploads = 'https://www.melhores-compras.online/dev'
const imgAlt = computed(() => props.data.attributes.image.data[0].attributes.alternativeText ? props.data.attributes.image.data[0].attributes.alternativeText : props.data.attributes.image.data[0].attributes.name)
// const category = props.data.attributes.category ?? 'Diversos'

const likes = computed(() => props.data.attributes.likes ? props.data.likes : 0)

const imgSrcset = computed(() => {
  let srcset = ""
  if (props.data.attributes.image.data[0].attributes.formats.hasOwnProperty('thumbnail')) {
    srcset += `${baseUrlUploads}${props.data.attributes.image.data[0].attributes.formats.thumbnail.url} ${props.data.attributes.image.data[0].attributes.formats.thumbnail.width}w, `
  }
  if (props.data.attributes.image.data[0].attributes.formats.hasOwnProperty('small')) {
    srcset += `${baseUrlUploads}${props.data.attributes.image.data[0].attributes.formats.small.url} ${props.data.attributes.image.data[0].attributes.formats.small.width}w, `
  }
  if (props.data.attributes.image.data[0].attributes.formats.hasOwnProperty('medium')) {
    srcset += `${baseUrlUploads}${props.data.attributes.image.data[0].attributes.formats.medium.url} ${props.data.attributes.image.data[0].attributes.formats.medium.width}w, `
  }
  return srcset
})

const category = (category) => {
  if (!category) return 'diversos';
  const categoryArray = category.split(/[>\/]/);
  const lastPart = categoryArray[categoryArray.length - 1].trim();
  return lastPart;
};
// console.log(imgSrcset.value)

// console.log(props.data.attributes.image.data.attributes.formats)

// console.log(JSON.stringify(props.data.attributes.image.data[0].attributes.formats, null, 2))
</script>