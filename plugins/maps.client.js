export default function (context, inject) {
  let map
  let didScriptLoad = false
  let canvas
  let position
  let zoom

  inject('maps', {
    showMap,
  })

  function showMap(props) {
    saveProps(props)

    if (!didScriptLoad) {
      addScript()
    } else {
      onScriptLoad()
    }
  }

  function saveProps(props) {
    canvas = props.map
    position = props.position
    zoom = props.zoom
  }

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAEyOg4f_pHauRXt7UkBh5dYRsrxheULfY&libraries=places&callback=onScriptLoad'
    script.async = true
    // Note that we first define onScriptLoad before appending the script to the head
    window.onScriptLoad = onScriptLoad
    document.head.appendChild(script)
  }

  function onScriptLoad() {
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
    map = renderMap()
    renderMarker()
    didScriptLoad = true
  }

  function renderMap() {
    // eslint-disable-next-line
    return new google.maps.Map(canvas, getMapOptions())
  }

  function renderMarker() {
    // eslint-disable-next-line
    new google.maps.Marker(getMarkerOptions())
  }

  function getMapOptions() {
    return {
      center: position,
      zoom,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: true,
    }
  }
  function getMarkerOptions() {
    return {
      position,
      map,
    }
  }
}
