<template>
  <div>
    <Home class="home-page" :home="home" />
    <div id="map"></div>
  </div>
</template>

<script>
import homes from '~/data/homes'
export default {
  data() {
    return {
      home: homes[0],
      position: { lat: 12.971599, lng: 77.594566 },
      zoom: 12,
      map: null,
    }
  },
  head() {
    return {
      title: this.home.title,
      script: [
        {
          src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEyOg4f_pHauRXt7UkBh5dYRsrxheULfY&libraries=places',
          hid: '83jofwoi3',
          async: true,
          body: true,
        },
      ],
    }
  },
  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id)
  },
  /*
      1. we want google maps to be initialized client side only, especially because
      google is always null on the server-side

      2. mounted is run client side only, unlike created which is run on both client and server
  */
  mounted() {
    this.setupGoogleMaps()
  },
  methods: {
    setupGoogleMaps() {
      try {
        this.map = this.initMap(this.position, this.zoom)
        this.setMarker(this.map, this.position)
      } catch (e) {
        console.log('setupGoogleMaps erred: ', e)
        setTimeout(() => {
          this.setupGoogleMaps()
        }, 1000)
      }
    },

    initMap(center, zoom) {
      // eslint-disable-next-line
      return new google.maps.Map(document.getElementById('map'), {
        center,
        zoom,
      })
    },

    setMarker(map, position) {
      // eslint-disable-next-line
      new google.maps.Marker({
        position,
        map,
      })
    },
  },
}
</script>

<style scoped>
#map {
  height: 100vh;
  background: #9bd2fe;
}
</style>
