<template>
  <div>
    <Home class="home-page" :home="home" />
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import homes from '~/data/homes'

if (process.client) {
  window.setupGoogleMaps = () => {
    // set a flag to mark map is loaded
    window.hasMapScriptLoaded = true
  }
}

let setupGoogleMapsTimeout = null
export default {
  data() {
    return {
      home: homes[0],
      position: null,
      zoom: 18,
      map: null,
    }
  },
  head() {
    return {
      title: this.home.title,
      /*
        1. You see this error in the browser ->
          You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors.

        2. Let's try to understand what's going on ->

          a. Nuxt dyncamically removes and adds the script tags based on the route. In this case, the Google Maps script is added when the user navigates to /homes/_id and removed when they navigate away.

          b. When a 3rd party script is added on a page, it runs its own JS and inserts further scripts, which in turn might do the same

          c. From the third-party api's perspective however, the script is removed and loaded again on the same page (since the whole app is a single page).

          d. In a traditional app, when a page navigation happens, the browser forgets things about the previous page.

          e. But, in the case of an SPA, page navigations are simulated so that the browser never actually navigates to another page and thereby does not forget that the script already ran (the side-effects of the script running its JS continue to exist)

        3. How does one avoid this problem?

          a. we've to ensure the js Google Maps API runs (including the scripts it adds) is run only once throughout the lifespan of the session

          b. the callback param of the Google Maps script comes to the rescue. The specified callback is called once the script has loaded

          c. the script is run in the global scope and not in view land, therefore define the callback function off the window object

          d. define a flag hadLoaded and only set the script if not already loaded

      */
      script: [this.googleMapsScript],
    }
  },
  computed: {
    googleMapsScript() {
      return {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEyOg4f_pHauRXt7UkBh5dYRsrxheULfY&libraries=places&callback=setupGoogleMaps',
        hid: '83jofwoi3',
        async: true,
        body: true,
        // Ask nuxt to skip rendering this script after it loads
        skip: process.client && window.hasMapScriptLoaded,
      }
    },
    mapOptions() {
      return {
        center: this.position,
        zoom: this.zoom,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
      }
    },
    markerOptions() {
      return {
        position: this.position,
        map: this.map,
      }
    },
  },
  created() {
    this.home = homes.find((home) => home.objectID === this.$route.params.id)
    this.position = { lat: this.home._geoloc.lat, lng: this.home._geoloc.lng }
  },

  beforeDestroy() {
    clearTimeout(setupGoogleMapsTimeout)
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
      if (!window.hasMapScriptLoaded) {
        setupGoogleMapsTimeout = setTimeout(() => {
          this.setupGoogleMaps()
        }, 200)
        return
      }
      this.map = this.initMap()
      this.setMarker()
    },

    initMap() {
      // eslint-disable-next-line
      return new google.maps.Map(this.$refs.map, this.mapOptions)
    },

    setMarker() {
      // eslint-disable-next-line
      new google.maps.Marker(this.markerOptions)
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
