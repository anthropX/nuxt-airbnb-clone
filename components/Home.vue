<template>
  <div v-if="!!home" class="home-card mr-2">
    <div class="images flex w-screen overflow-auto">
      <img
        v-for="(image, index) in home.images"
        :key="index"
        :src="image"
        :alt="`image ${index + 1}`"
        width="500"
      />
    </div>
    {{ home.title }}<br />
    ${{ home.pricePerNight }} per night <br />

    <div class="location flex">
      <img src="/images/marker.svg" width="20" alt="" />{{
        home.location.address
      }}, {{ home.location.city }}, {{ home.location.state }},
      {{ home.location.country }} <br />
    </div>

    <div class="review flex">
      <img src="/images/star.svg" width="20" alt="" />{{ home.reviewValue
      }}<br />
    </div>

    {{ home.guests }} guests, {{ home.bedrooms }} bedrooms,
    {{ home.beds }} beds, {{ home.bathrooms }} bathrooms
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  props: {
    home: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
