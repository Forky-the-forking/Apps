<template>
  <div class="home">
    <div v-if="loading" class="ui active large loader"></div>
    <div v-if="!loading" class="ui grid">
      <home-market-data :totalMarketCap="totalMarketCap" :total24HrVolume='total24HrVolume' :totalBTCPercentage="totalBTCPercentage" />
      <div class="sixteen wide column">
        <!-- Header -->
         <div class="ui right aligned category search item">
          <div class="ui transparent icon input">
          <v-select 
                  class="style-chooser"
                  id="v-select"
                  placeholder="Search Coin..."
                  :options="coins"
                  @input="selectCoin"
                  label="name"
                > 
                <template  #open-indicator="{ attributes }">
                  <span v-bind="attributes">
                <i  class="click big hand point down icon"></i></span>
                </template>
                <template slot="option" slot-scope="option">
                  <img :src="`https://chasing-coins.com/api/v1/std/logo/${option.symbol}`" class="select__logo"/>
                  <span class="select__name">{{ option.name }} </span>
                </template>
            </v-select>
          </div>
      </div>
        <home-column-item />
        <!-- HomeCoinItem -->
        <home-coin-item v-for="coin in coins" :key="coin.id" :coin="coin" :coinQuote="coin.quote.USD"/>
      </div>
    </div>
  

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import utils from '@/utils';
import HomeColumnItem from './components/home-column-item.vue';
import HomeCoinItem from './components/home-coin-item';
import HomeMarketData from './components/home-market-data';
import { createPopper } from '@popperjs/core';

export default {
  name: 'HomePage',
  created() {
    this.formatCurrency = utils.formatCurrency;
  },
  computed:
  {
      ...mapGetters([
          'coins',
          'totalMarketCap',
          'total24HrVolume',
          'totalBTCPercentage',
          'loading',
          'exchanges'
      ])
  },
  components:
  {
    'home-coin-item': HomeCoinItem,
    'home-market-data': HomeMarketData,
    'home-column-item': HomeColumnItem,
  },
  methods:
  {
    selectCoin(val)
    {
      if(val)
        this.$router.push(`/currency/${val.slug}`);
    },
    
     withPopper (dropdownList, component, {width}) {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = width;

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset', options: {
              offset: [0,10]
            }
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn ({state}) {
              component.$el.classList.toggle('drop-up', state.placement === 'top')
            },
          }]
      });

      /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
      return () => popper.destroy();
    }
  }
}
</script>

<style src="./../../assets/styles/home-page.css">
</style>
