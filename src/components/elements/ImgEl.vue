<template>
  <div class="img-el">
    <img :src="src">
  </div>
</template>

<script>

export default {
  name: 'imgEl',
  props: {
    src: String
  },
  setup(){

  }
}
</script>

<style scoped lang="less">
.img-el{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
    border: none;    
  }
}
</style>