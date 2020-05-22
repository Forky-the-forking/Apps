<template>
  <div class="column">
    <div class="ui raised link black raised centered card">
      <div class="content">
          <animate-number
            class="size"
            from="1" 
            :to="item.number + 1" 
            from-color="#44CC00" 
            to-color="#ec4949"
            duration="1000" 
            easing="easeInSine"
          ></animate-number>
      </div>
      <div class="center aligned description">
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"statItem",
    props:['item']
}
</script>

<style src="./../../../assets/styles/stat-item.css">
</style>
