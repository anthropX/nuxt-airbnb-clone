<template>
  <NuxtLink
    v-if="!!home"
    :to="`/homes/${home.objectID}`"
    class="home-card w-72 mr-2"
  >
    <img :src="home.images[0]" :alt="home.title" />
    {{ home.title }}<br />
    {{ home.location.address }}, {{ home.location.city }},
    {{ home.location.state }}, {{ home.location.country }}
    {{ home.guests }} guests ${{ home.pricePerNight }} per night
  </NuxtLink>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
