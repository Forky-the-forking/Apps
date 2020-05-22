<template>
    <div class="sixteen wide column coin-market">
        <div class="ui three column grid">
            <div class="column">
                <div class="ui segment banner">
                    Market Cap: {{formatCurrency(totalMarketCap)}}
                </div>
            </div>
            <div class="column">
                <div class="ui segment banner">
                    Volume (24hr): {{formatCurrency(total24HrVolume)}}
                </div>
            </div>
            <div class="column">
                <div class="ui segment banner">
                    BTC Dominance: {{formatCurrency(totalBTCPercentage)}}%
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import utils from '@/utils';
export default {
    name: 'HomeMarketData',
    props: ['totalMarketCap','total24HrVolume','totalBTCPercentage'],
    created() {
        this.formatCurrency = utils.formatCurrency;
    }
}
</script>


<style src="./../../../assets/styles/home-page.css">
</style>