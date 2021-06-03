<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from "./store/index"
export default defineComponent({
  name: 'App',
  components: {
  },
  setup(){
    const a = useStore();
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
::-webkit-scrollbar{
    width: 5px;
    height: 10px;
}
::-webkit-scrollbar-track{
    background: rgba(0, 0, 0, 0);
}
::-webkit-scrollbar-thumb{
    background:#5F7979;
    border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover{
    background:#384747;
}
</style>
