<template>
  <div class="page-setting">
    <div class="page-set-title">背景设置</div>
    <div class="page-set-background-img">
      <div class="label">
        <span>背景图</span>
      </div>
      <div class="box">
        <img :src="bgImg" v-if="bgImg" alt="">
      </div>
      <div class="btns">
        <el-button @click="deleteBgImg">删除图片</el-button>
        <el-button @click="changeBgImgBtn">更换图片</el-button>
      </div>
    </div>
  </div>
  <!-- teleport 会把真实的dom放到选择的元素里  to="css选择器"-->
  <Teleport to="body">
      <AddEleDialog v-model="dialogShow" title="背景设置">
        <BackgroundList @closeDialog="closeDialog"/>
      </AddEleDialog>
  </Teleport>
</template>

<script lang="ts">
import { useStore } from "/@/store/store.ts"
import { defineComponent, ref, computed } from "vue";
import AddEleDialog from "../dialog/AddEleDialog.vue";
import BackgroundList from "../dialog/BackgroundList.vue";
export default defineComponent({
  components: {
    AddEleDialog,
    BackgroundList
  },
  setup(props, ctx){
    const store = useStore();
    const curPagePlayAmRef = ref('none');
    // 背景图片
    const dialogShow = ref(false);
    const changeBgImgBtn = () => {
      dialogShow.value = true;
    }
    const testShow = ref(false);
    const deleteBgImg = () => {
      store.commit('setCurPageDataBackground', {type: 'bgImage', image: ''})
    }
    const closeDialog = () => {
      dialogShow.value = false;
    }
    return {
      bgImg: computed(() => store.state.currentPageData?.background.style.backgroundImage),
      curPagePlayAmRef,
      dialogShow,
      changeBgImgBtn,
      testShow,
      deleteBgImg,
      closeDialog
    }
  }
})
</script>

<style scoped lang="less">
.page-setting {
  width: 260px;
  height: 100px;
  padding: 0 10px;
}
.page-set-title{
  font-size: 16px;
  line-height: 2.5;
  border-bottom: 1px solid #ddd;
}
.page-set-background-img{
  margin: 10px 0;
  .label{
    font-size: 14px;
    color: #666;
    span{margin-left: 10px;}
  }
  .box{
    height: 140px;
    margin: 10px;
    border:  1px solid #e6e6e6;
    background: url(../../assets/images/bgblank.png);
    text-align: center;
    img{
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  .btns{
    text-align: center;
  }
}
</style>