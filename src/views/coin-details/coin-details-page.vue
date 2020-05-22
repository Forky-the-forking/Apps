<template>
  <div>
    <div class="ui grid dashboard" >
      <div class="sixteen wide column">
        <img :src="`https://chasing-coins.com/api/v1/std/logo/${coin.symbol}`" />
        <h1 class="ui header"> {{ coin.name }} <span> {{ coin.symbol }} </span></h1>
        <a class="ui orange label"> {{ coin.rank }} </a>
     
        <p class="dashboard__trading">Currently trading at
          <span class="segment__primary"> {{ formatCurrency(coinQuote.price) }} </span>
        </p>
        <p class="dashboard__market-cap">with a Market Cap of
          <span class="segment__primary"> {{ formatCurrency((coinQuote.market_cap)) }} </span>
        </p>
        <div class="ui cards">
          <div class="card">
            <div class="content">
              <div class="header">Volume (24hr)</div>
              <div class="meta">Volume that has been traded in the last 24hrs</div>
              <div style="position:relative; right: 10px;" class="description"
              :class="[isValuePositive(coinQuote.volume_24h) ? 'segment__positive' : 'segment__negative']">
                  {{ formatCurrency(coinQuote.volume_24h.toFixed(0)) }}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="header">1hr Change</div>
              <div class="meta">Price change in the last hour</div>
              <div class="description"
              :class="[isValuePositive(coinQuote.percent_change_1h) ? 'segment__positve' : 'segment__negative']">
                  {{ coinQuote.percent_change_1h }} %
              </div>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="header">24hr Change</div>
              <div class="meta">Price change in the last 24 hrs</div>
              <div class="description" :class="isValuePositive(coinQuote.percent_change_24h) ? 'segment__positive' : 'segment__negative' ">
                  {{ coinQuote.percent_change_24h }} %
              </div>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="header">7 day Changes</div>
              <div class="meta">Price change in the last 7 days</div>
              <div class="description">
                  {{ coinQuote.percent_change_7d }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="load" class="ui active loader inline margin"></div>
      <chart-item class="margin" v-if="!load" :slug="slug" :coinChartData="coinChartData" :key="$route.params.id"/>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import chartItem from './chart-item.vue';
import {mapGetters} from 'vuex';
export default{
    name: 'CoinDetailsPage',
    props: ['slug'],
    created()
    {
        this.data += 1;
        this.formatCurrency = utils.formatCurrency;
        this.isValuePositive = utils.isValuePositive;
        this.$store.dispatch('getCoinGraphData', this.$store.getters.idCoin(this.coin.symbol));
    },
    computed:
    {
        coin()
        {
            return this.$store.getters.coinDataFromSlug(this.slug);
        },
        coinQuote()
        {
            return this.$store.getters.coinDataFromSlug(this.slug).quote.USD;
        },
        ...mapGetters([
           'load',
           'coinChartData'
        ])
    },
    components:
    {
      'chart-item': chartItem
    }
}
</script>

<style src="./../../assets/styles/coin-details-page.css">

</style>