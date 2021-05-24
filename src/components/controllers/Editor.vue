<template>
  <div class="editor-container">
    <div class="editor-content">
    </div>
    <div class="editor-line-x">
      <div class="tips">iPhone X</div>
    </div>
    <div class="editor-line"></div>
    <div class="editor" :style="{filter: pageFilter}">
      <div class="editor-background" style="opacity: 1">
        <div class="editor-background-color" :style="{ backgroundColor: bgColor,animation: curPagePlayAmRef }"></div>
        <div class="editor-background-img" :style="{ backgroundImage: `url(${bgImg})`, animation: curPagePlayAmRef}"></div>
      </div>
      <div id="editor" class="editor-inner">
        <SmartEl v-for="(data, index) in elements" 
          :key="data.id"
          :data="data"
          :zIndex="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "/@/store/store.ts";
import SmartEl from '/@/components/elements/SmartEl.vue';
export default defineComponent({
  components:{
    SmartEl
  },
  setup(){
    const store = useStore();
    const curPagePlayAmRef = ref('none');
    return {
      bgColor: computed(() => store.state.page.currentPageData.background.style.backgroundColor),
      bgImg: computed(() => store.state.page.currentPageData.background.style.backgroundImage),
      pageFilter: computed(() => store.state.page.currentPageData.background.style.filter),
      curPagePlayAmRef,
      elements: computed(() => store.state.page.currentPageData.elements),
    }
  }
})
</script>

<style scoped lang="less">
.editor-container {
  flex: 1;
  background: #eee;
  position: relative;
  .editor-content{
    width: 100%;
    height: 100%;
  }
}
.editor{
  box-sizing: border-box;
  width: 322px;
  height: 486px;
  border: 1px dashed #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: calc(-322px / 2);
  margin-top: calc(-486px / 2);
  .editor-background{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    .editor-background-color,
    .editor-background-img{
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-origin: content-box;
    }
  }
}
#editor{
  width: 100%;
  height: 100%;
}
.editor-line-x{
  box-sizing: border-box;
  position: absolute;
  width: 322px;
  height: 620px;
  left: 50%;
  top: 50%;
  margin-left: -161px;
  margin-top: -310px;
  border: 1px dashed #999;
  .tips{
    position: absolute;
    top: -20px;
    font-size: 12px;
    color: #999;
  }
}
.editor-line{
  position: absolute;
  width: 322px;
  height: 520px;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  margin-left: -161px;
  margin-top: -260px;
  border: 1px dashed #999;
}

</style>