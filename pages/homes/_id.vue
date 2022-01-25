<template>
  <div>
    <Home class="home-page" :home="home" />
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import homes from '~/data/homes'

export default {
  data() {
    return {
      home: homes[0],
    }
  },
  head() {
    return {
      title: this.home.title,
    }
  },
  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id)
  },

  /*
      1. we want google maps to be initialized client side only, especially because google is always null on the server-side

      2. mounted is run client side only, unlike created which is run on both client and server
  */
  mounted() {
    this.$maps.showMap({
      map: this.$refs.map,
      position: { lat: this.home._geoloc.lat, lng: this.home._geoloc.lng },
      zoom: 18,
    })
  },
}
</script>

<style scoped>
#map {
  height: 100vh;
  background: #9bd2fe;
}
</style>
