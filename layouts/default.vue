<template>
  <Html class="scroll-smooth bg-[#f7eff5]">
  <div class="flex flex-col h-full antialiased ">
    <header class="bg-slate-300">
      <div class="flex justify-center gap-3">
        <NuxtLink to="/amazon">Amazon</NuxtLink>
        <NuxtLink to="/lomadee">Lomadee</NuxtLink>
      </div>
    </header>

    <div class="flex-1">

      <!-- create aside menus later  -->
      <!-- <aside class="flex-1" /> -->

      <!-- <div class="h-full p-5 bg-slate-300 mx-auto max-w-[58rem]">
      </div> -->
      <div>

        <slot />
      </div>

      <!-- <aside class="flex-1" /> -->
    </div>

    <footer class="bg-slate-300">
      footer
    </footer>
  </div>

  </Html>
</template>

<script setup lang="ts">
</script>
 