<template>
  <div id="exchange-detail-page" class="ui grid dashboard exchange" v-if="exchange">
    <div class="sixteen wide column">
      
      <img :src="`${exchange.iconUrl}`">
      <h1 class="ui header"> {{ exchange.name }} </h1>
      <div class="settingFont" v-bind:class="{ spacing : !descriptionCheck}" >
        <a :href="`${exchange.websiteUrl}`" class="ui red label"> {{ exchange.websiteUrl }} </a>
        <span class="ui white label"> Rank: {{ exchange.rank }} </span>
      </div>
      

      <p v-if="descriptionCheck" class="content ui blue label">
        {{ exchange.description }}
      </p>
       <div class="ui cards">
         <div class="card">
          <div class="content">
            <div class="header">Fiabilité</div>
            <div  class="description">
              <span v-if="exchange.verified"><strong>Verifié.</strong> </span>
              <span v-else>Non Vérifié.</span>
            </div>
          </div>
         </div> 
         <div class="card">
          <div class="content">
            <div class="header">Market Share</div>
            <div class="description">
              {{ formatCurrency(exchange.marketShare) }}
            </div>
          </div>
         </div><div class="card">
          <div class="content">
            <div class="header">Volume</div>
            <div style="position:relative; right: 0px;" class="description">
              {{ formatCurrency(exchange.volume.toFixed()) }}
            </div>
          </div>
         </div>
        </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
export default{
    name: 'ExchangeDetailsPage',
    props: ['name'],
    created()
    {
        this.formatCurrency = utils.formatCurrency;
    },
    computed: 
    {
        exchange()
        {
            return this.$store.getters.exchangeDataFromName(this.name);
        },
        descriptionCheck()
        {
          if(this.exchange.description && this.exchange.description.trim())
            return true;
          return false;
        }
    },
}
</script>

<style src="./../../../assets/styles/coin-details-page.css">

</style>