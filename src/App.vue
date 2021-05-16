<template>
    <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, Arial,'Microsoft YaHei' sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
