<template>
  <div id="app">
    <div id="nav">
      <app-header />
    </div>
    <div id="main">
       <router-view/>
    </div>
       <app-footer />
  </div>
</template>
<script>
import AppHeader from '@/views/App/app-header.vue';
import AppFooter from '@/views/App/app-footer.vue';
export default {
  name: 'App',
  created()
  {
    this.$store.dispatch('getCoins');
    this.$store.dispatch('getMarketData');
    this.$store.dispatch('getExchangeData');
    this.$store.dispatch('getCoinsId');
  },
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter
  }
}
</script>

<style src="C:\Users\picot\Desktop\Portfolio_full\Git_Repository\vue\coin\simple-coin-cap-1\src\assets\styles\app.css" scoped>
</style>
