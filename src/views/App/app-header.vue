<template>
  
  <sui-menu :widths="3" class="device column width">

    <router-link
    to="/"
    class="ui icon item"
    :class="{'item__active' : $route.path === '/'}"
    >
        <i class="home icon huge"></i>
    </router-link>

    <router-link
      to="/exchange"
      class="ui icon item centered" :class="{ 'item__active' : $route.path === '/exchange'}"
      >
      <mq-layout mq="lg+" :class="{ 'item__active' : $route.path === '/exchange'}" class="ui icon borderless item centered">
        <i  class="hand point right huge icon"><span class="market">MARKETS</span></i>
      </mq-layout>
      
      <div class="responsive" :class="{ 'item__active' : $route.path === '/exchange'}">
        <i  class="money bill alternate huge icon"></i>
      </div>  

    </router-link>

     <router-link 
      to="/about"
      class="ui icon item"
      :class="{ 'item__active' : $route.path === '/about'}">
      <i class="question icon huge"></i>
    </router-link>

  </sui-menu>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "AppHeader",
  computed: 
  {
    ...mapGetters([
      'coins'
    ])
  }
}
</script>

<style src="./../../assets/styles/app-header.css">
</style>
