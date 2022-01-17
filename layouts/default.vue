<template>
  <div class="layout flex flex-col">
    <header class="bg-red-600 text-white p-2">
      <NuxtLink to="/">Airbnb</NuxtLink>
    </header>
    <Nuxt class="grow" />
    <footer class="text-center">Copyright 2022</footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
<style scoped>
.grow {
  flex-grow: 1;
}
</style>
