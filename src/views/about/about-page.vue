<template>
<div class="ui container">
  <div class="ui stackable three column grid">
   <stat-items v-for="item in statItems" :item="item" :key='item.id' />
  </div>

  <section class="centered">
    <h1>Style = <a href="https://semantic-ui.com/"><img class="logo" :src="ui" alt=""> <span>Semantic-ui</span></a></h1>
    <h1>Search Icon = <a href="https://vue-select.org/"><img class="logo" :src="vue" alt=""><span>Vue-select</span></a> + <a href="https://popper.js.org/"><img class="logo" :src="popper" alt=""><span>Popper.js</span></a></h1>
    <h1>Coins listing = <a href="https://coinmarketcap.com/api/"><img class="logo" :src="coinmarketcap" alt=""><span class="little">CoinMarketCap</span></a> + <a href="https://coinranking.com/"><img class="logo" :src="coinrankingicon" alt=""><span>Coin Ranking API's</span></a></h1>
    <h1>Chart = <a href="https://apexcharts.com"><img class="logo" :src="apex" alt=""><span>Apex Charts</span></a></h1>
    <h1>State Management = <a href="https://vuex.vuejs.org"><img class="logo" :src="vue" alt=""><span>Vue X</span></a></h1>
    <h1>Routing  = <a href="https://router.vuejs.org/"><img class="logo" :src="vue" alt=""><span>Vue-Router</span></a> + <a href="https://expressjs.com/fr/"><span>Express</span></a></h1>
    <h1>Framework Front-end = <a href="https://vuejs.org/"><img class="logo" :src="vue" alt=""><span>Vue.js</span></a></h1>
    <h1>Back-end = <a href="https://nodejs.org/en/"><img class="logo" :src="node" alt=""><span>Node.js</span></a></h1>
  </section>

</div>
</template>

<script>
import coinmarketcap from '@/assets/coinmarketcap.png';
import coinrankingicon from '@/assets/coinranking-icon.svg';
import ui from '@/assets/semantic-ui.svg';
import popper from '@/assets/popper-js.png';
import apex from '@/assets/apex.png';
import vue from '@/assets/vue.png';
import node from '@/assets/node.svg';

import statItem from './components/stat-item.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'AboutPage',
  data() {
    return {
      coinmarketcap,
      coinrankingicon,
      ui,
      apex,
      popper,
      vue,
      node

    }
  },
  components:
  {
    'stat-items': statItem
  },
  computed:
  {
    ...mapGetters([
      'statItems'
    ])
  }
}
</script>

<style src="./../../assets/styles/about-page.css">
</style>
