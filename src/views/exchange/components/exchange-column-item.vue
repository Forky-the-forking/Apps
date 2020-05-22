<template>
    <div class="row">
      <div class="sixteen wide column">
        <h1 class="market-title">{{text}}</h1>
        <div class="ui segment header desktop">
             <div class="ui four column grid">
                <div class="column">rank</div>
                <div class="column">name</div>
                <div class="column">24h trade Volume</div>
                <div class="column">Markets</div>
             </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ExchangeColumnItem',
  props: ['text']
}
</script>

<style src="./../../../assets/styles/home-page.css">
</style>
