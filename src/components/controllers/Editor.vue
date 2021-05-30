<template>
  <div class="editor-container"
    @mouseup.prevent="onMouseUp"
    @mousedown.prevent="onMouseDown"
    @mousemove.prevent="onMouseMove"
  >
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
    //选中的元素的store json数据
    const choseElementRef = ref(null);
    let startPoint = {x: 0, y: 0};
    let startPosition = null;
    let isMove = false;
    //变形模式 空字符串为移动
    let transfromType = "move";
    // 鼠标事件
    const onMouseDown = (e) => {
      const eles = store.state.page.currentPageData.elements;
      startPoint = {x: e.clientX, y: e.clientY};
      isMove = true;
      // 找到点击的元素的数据 赋值choseElement
      e.path.some((dom) => {
        if(dom.className == "smart-ele"){
          const domId = dom.attributes['data-id'].value;
          eles.some(ele => {
            if(ele.id == domId){
              choseElementRef.value = ele;
            }
          })
          return true;
        }
      })
      // 保存元素移动前的位置信息
      if(choseElementRef.value !== null){
        startPosition = {
          top: choseElementRef.value.style.top * 1,
          left: choseElementRef.value.style.left * 1,
          width: choseElementRef.value.style.width * 1,
          height: choseElementRef.value.style.height * 1,
          rotate: choseElementRef.value.style.roteDeg,
        }
      }
      // 判断变形的模式
      const className = e.target.className;
      if(className.indexOf('circle') > -1){
        if(className.indexOf('N') > -1) transfromType = "N";
        if(className.indexOf('S') > -1) transfromType = "S";
        if(className.indexOf('W') > -1) transfromType = "W";
        if(className.indexOf('E') > -1) transfromType = "E";
        if(className.indexOf('left-top') > -1) transfromType = "NW";
        if(className.indexOf('right-top') > -1) transfromType = "NE";
        if(className.indexOf('right-bottom') > -1) transfromType = "SE";
        if(className.indexOf('left-bottom') > -1) transfromType = "SW";
        if(className.indexOf('rotate ') > -1) transfromType = "rotate";
      }
    }
    const transfromMap = {
      move(e){
        choseElementRef.value.style.left = startPosition.left + e.clientX - startPoint.x;
        choseElementRef.value.style.top = startPosition.top + e.clientY - startPoint.y;
      },
      N(e){
        choseElementRef.value.style.height = startPosition.height + startPoint.y - e.clientY;
        choseElementRef.value.style.top = startPosition.top - (startPoint.y - e.clientY);
      },
      S(e){
        choseElementRef.value.style.height = startPosition.height + e.clientY - startPoint.y;
      },
      E(e){
        choseElementRef.value.style.width = startPosition.width + e.clientX - startPoint.x;
      },
      W(e){
        choseElementRef.value.style.width = startPosition.width - (e.clientX - startPoint.x);
        choseElementRef.value.style.left = startPosition.left - (startPoint.x - e.clientX);
      },
      NE(e){
        choseElementRef.value.style.height = startPosition.height + (startPoint.y - e.clientY);
        choseElementRef.value.style.width = startPosition.width + (startPoint.y - e.clientY);
        choseElementRef.value.style.top = startPosition.top - (startPoint.y - e.clientY);
      },
      NW(e){
        choseElementRef.value.style.height = startPosition.height + (startPoint.y - e.clientY);
        choseElementRef.value.style.width = startPosition.width + (startPoint.y - e.clientY);
        choseElementRef.value.style.top = startPosition.top - (startPoint.y - e.clientY);
        choseElementRef.value.style.left = startPosition.left - (startPoint.y - e.clientY);
      },
      SW(e){
        choseElementRef.value.style.height = startPosition.height + (e.clientY - startPoint.y);
        choseElementRef.value.style.width = startPosition.width + (e.clientY - startPoint.y);
        choseElementRef.value.style.left = startPosition.left - (e.clientY - startPoint.y);
      },
      SE(e){
        choseElementRef.value.style.height = startPosition.height + (e.clientY - startPoint.y);
        choseElementRef.value.style.width = startPosition.width + (e.clientY - startPoint.y);
      },
      rotate(e){
        const rect = document.querySelector(`#smartEl${choseElementRef.value.id}`).getBoundingClientRect();
        const roteX = e.pageX - (rect.left + choseElementRef.value.style.width / 2);
        const roteY = e.pageY - (rect.top + choseElementRef.value.style.height / 2);
        let roteDeg = Math.round((360 - ((180 / Math.PI) * Math.atan2(roteY, roteX)) - 90))
        if (roteDeg > 360) {
					roteDeg = 720 - roteDeg;
        } else {
          roteDeg = 360 - roteDeg
        }
        if(roteDeg == 360){
          roteDeg = 0;
        }
        //赋值元素
        choseElementRef.value.style.roteDeg = startPosition.rotate + roteDeg;
      }
    }
    const getAngle = (x1, y1, x2, y2) => {
      const dot = x1 * x2 + y1 * y2;
      const det = x1 * y2 - y1 * x2;
      const angle = Math.atan2(det, dot) / Math.PI * 180;
      return (angle + 360) % 360;
    }
    const onMouseMove = (e) => {
      if(isMove && choseElementRef.value){
        transfromMap[transfromType](e);
      }
    }
    const onMouseUp = (e) => {
      isMove = false;
      transfromType = "move";
      // 储存选中的元素id 和数据
      e.path.some((ele) => {
        if(ele.className == "smart-ele"){
          const id = ele.attributes['data-id'].value;
          store.commit('element/setSelectedIds', [id]);
          return true
        }
      })
      store.commit('element/setSelectElement', choseElementRef.value);
    }
    return {
      bgColor: computed(() => store.state.page.currentPageData.background.style.backgroundColor),
      bgImg: computed(() => store.state.page.currentPageData.background.style.backgroundImage),
      pageFilter: computed(() => store.state.page.currentPageData.background.style.filter),
      curPagePlayAmRef,
      elements: computed(() => store.state.page.currentPageData.elements),
      onMouseUp,
      onMouseMove,
      onMouseDown
    }
  }
})
</script>

<style scoped lang="less">
.editor-container {
  flex: 1;
  background: #eee;
  position: relative;
  overflow: hidden;
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