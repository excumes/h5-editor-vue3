<template>
    <div class="addBackgroundList">
        <div class="images-item" v-for="(img ,index) in backgroundList" :key="index" @click="addBackground(img)">
            <el-image style="width:100%;height:100%" :src="img.src" fit='contain' />
        </div>
    </div>
</template>
<style scoped lang="less">
.addBackgroundList{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    .images-item{
        margin: 10px;
        background: #EEEEEE;
        width: 136px;
        height: 136px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
<script>
import {defineComponent ,onMounted, ref} from 'vue';
import { useStore } from "../../store/index";
import * as api from "@/api/index.ts";
export default defineComponent({
  setup(props, ctx){
    const store =  useStore();
    const addBackground = (img) => {
      store.commit('page/setCurPageDataBackground', { image: img.src, type: 'bgImage'});
      ctx.emit('closeDialog');
    }
    const backgroundList = ref([{src: ''}]);
    onMounted(async () =>{
      backgroundList.value = await api.getBackgroundList();
    })
    return {
      addBackground,
      backgroundList
    }
  }
})
</script>