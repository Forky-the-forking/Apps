<template>
  <div id="exchange" class="home">
    <div  class="ui container">
    
      <div id="exchange-smartphone" class="ui grid"> 
        <home-market-data :totalMarketCap="totalMarketCap" :total24HrVolume='total24HrVolume' :totalBTCPercentage="totalBTCPercentage" />
        <div class="sixteen wide column">
        
        <div class="ui aligned category search item">
          <div class="ui transparent icon input">
            <v-select 
              class="style-chooser"
              id="v-select"
              placeholder="Search Exchange Market..."
              :options="exchanges"
              @input="selectExchange"
              label="name"
            > 
            <template  #open-indicator="{ attributes }">
              <span v-bind="attributes">
              <i class="click big hand point down icon"></i></span>
            </template>
            <template slot="option" slot-scope="option">
              <img :src="`${option.iconUrl}`" class="select__logo"/>
              <span class="select__name">{{ option.name }} </span>
            </template>
            </v-select>
          </div>
        </div>
        <exchange-column-item :text='text'/>
        <exchange-item  v-for="exchange in exchanges" :key="exchange.id" :exchange="exchange" />
      <!-- HomeexchangeItem -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import {mapGetters} from 'vuex';
import ExchangeItem from './components/exchange-item.vue';
import ExchangeColumnItem from './components/exchange-column-item';
import HomeMarketData from './../home/components/home-market-data';
import { createPopper } from '@popperjs/core';
export default {
  name: 'ExchangePage',
    data: () => ({ placement: 'top'}),
  created() {
    this.formatCurrency = utils.formatCurrency;
  },
  computed:
  {  
    exchanges()
    {
          return this.$store.getters.exchanges;
    },
    ...mapGetters([
        'totalMarketCap',
        'total24HrVolume',
        'totalBTCPercentage'
    ])
  },
  components:
  {
      'home-market-data': HomeMarketData,
      'exchange-item': ExchangeItem,
      'exchange-column-item': ExchangeColumnItem
  },
  attributes: {
  'ref': 'openIndicator',
  'role': 'presentation',
  'class': 'vs__open-indicator',
  },
  methods:
  {
    
    selectExchange(val)
    {
      if(val)
        this.$router.push(`/exchange/${val.name}`);
    },
     withPopper (dropdownList, component, {width}) {
      dropdownList.style.width = width;
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
      return () => popper.destroy();
    }
  }
}
</script>

<style src="./../../assets/styles/home-page.css">
</style>
