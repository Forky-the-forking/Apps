<template> 
    <div class="row"  @click="allera">
        <div class=" sixteen wide column">
            <div class="ui segment coin desktop">
                <div class="ui four column grid">
                    <div class="column segment__bold">{{ exchange.rank }}</div>
                    <div class="column segment__primary">
                        <img :src="`${exchange.iconUrl}`" class="segment__crypto-logo">
                        {{exchange.name}}
                    </div>
                    <div  class="column segment__bold">{{ formatCurrency(exchange.volume) }}</div>
                    <div class="column segment__primary">{{  exchange.numberOfMarkets }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/utils';
export default {
    name: 'ExchangeItem',
    props: ['exchange'],
    created()
    {
        this.formatCurrency = utils.formatCurrency;
    },
    methods:
    {
        allera()
        {
            this.$router.push(`/exchange/${this.exchange.name}`);
        }
    }
}
</script>