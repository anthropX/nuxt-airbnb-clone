<template>
  <div class="homes-page p-2">
    <h1>Homes</h1>
    <div class="homes flex">
      <HomeCard v-for="home in homes" :key="home.objectID" :home="home" />
    </div>
  </div>
</template>

<script>
import homes from '~/data/homes'
export default {
  name: 'IndexPage',
  data() {
    return {
      homes,
    }
  },
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is the Airbnb clone homepage',
          hid: '8fnh290f',
        },
      ],
    }
  },
}
</script>
