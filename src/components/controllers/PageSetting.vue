<template>
  <div class="page-setting">
    <div class="page-set-title">背景设置</div>
    <div class="page-set-background-img">
      <div class="label">
        <span>背景图</span>
      </div>
      <div class="box">
        <img :src="bgImg" alt="">
      </div>
      <div class="btns">
        <el-button>删除图片</el-button>
        <el-button>更换图片</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "/@/store/store.ts"
export default defineComponent({
  setup(){
    const store = useStore();
    const curPagePlayAmRef = ref('none');
    return {
      bgImg: computed(() => store.state.currentPageData?.background.style.backgroundImage),
      curPagePlayAmRef,
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
    background: #fff;
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