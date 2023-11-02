<template>
  <div class="m-10">

    <!-- <TabView v-model:activeIndex="activeIndex"> -->
    <TabView v-model:activeIndex="activeIndex" @update:activeIndex="saveNewTab">
      <TabPanel header="Ofertas">
        <TableLomadeeOfertas />
      </TabPanel>
      <TabPanel header="Categorias">
        <TableLomadeeCategorias />
      </TabPanel>
      <TabPanel header="Lojas">
        <TableLomadeeLojas />
      </TabPanel>
      <TabPanel header="Melhores Ofertas">
        <TableLomadeeMelhoresOfertas />
      </TabPanel>
      <TabPanel header="Ofertas Postados">
        <LomadeePostedOffers />
      </TabPanel>
    </TabView>

  </div>
</template>

<script setup>

const activeIndex = ref(2)
const activeTab = localStorage.getItem('activeTab');

// onBeforeMount(() => activeIndex.value = activeTab !== null ? parseInt(activeTab, 10) : 0)
onMounted(() => activeIndex.value = activeTab !== null ? parseInt(activeTab, 10) : 0)

const saveNewTab = (index) => {
  localStorage.setItem('activeTab', index.toString());
};

</script>

