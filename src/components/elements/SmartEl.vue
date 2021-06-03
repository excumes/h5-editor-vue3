<template>
  <div class="smart-ele"
    :data-id="data.id"
    :id="'smartEl' + data.id"
    :style="{
      left: data.style.left + 'px',
      top: data.style.top + 'px',
      width: (data.style.width * 1 + data.style.borderWidth * 2) + 'px',
      height: (data.style.height * 1 + data.style.borderWidth * 2) + 'px',
      background: data.style.background,
      zIndex: zIndex + 1,
      transform: `rotateZ(${data.style.roteDeg}deg)`,
    }"
  >
    <div class="element-box" style="position: relative; width: 100%; height: 100%;"
        :class="{'selected': eleSelected}"
    >
      <div class="ele-cont"
        :style="{
          width: data.style.width + 'px',
          height: data.style.height + 'px',
          opacity: 1 - data.style.opacity/100,
          backgroundColor: data.style.backgroundColor,
          borderColor: data.style.borderColor,
          borderWidth: data.style.borderWidth + 'px',
          borderStyle: data.style.borderStyle,
          borderRadius: (data.style.borderRadius/100) * (data.style.width/2),
          animation: data.currentPlayAm 
        }"
      >
        <ImgEl v-if="data.type === 1" :src="data.src"/>
      </div>
      <!-- 旋转圆点 -->
      <div class="rotate-line bar"></div>
      <div class="circle rotate bar"></div>
      <!-- 线条 -->
      <div class="top bar">
        <div class="circle N"></div>
      </div>
      <div class="bottom bar">
        <div class="circle S"></div>
      </div> 
      <div class="right bar">
        <div class="circle E"></div>
      </div>
      <div class="left bar">
        <div class="circle W"></div>
      </div>
      <!-- 顶角圆点 -->
      <div class="circle left-top bar"></div>
      <div class="circle right-top bar"></div>
      <div class="circle left-bottom bar"></div>
      <div class="circle right-bottom bar"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed} from 'vue'
import { useStore } from "../../store";
import ImgEl from "./ImgEl.vue";
export default defineComponent({
  name: "element",
  components: {
    ImgEl,
  },
  props: {
    data: Object,
    zIndex: Number
  },
  setup(props, ctx){
    const store = useStore();
    const eleSelected = computed(() => {
      const ids = store.state.element.selectedElIds;
      if(ids.includes(props.data?.id)){
        return true
      }
      return false
    })
    
    return {
      eleSelected
    }
  }
})
</script>
<style  scoped lang="less">
.barstyle{
  position: absolute;
  width: 100%;
  height: 1px;
  background: #29AAAF;
  touch-action: pan-x pan-y;
  user-select: none; 
  -webkit-user-drag: none; 
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.smart-ele{
  position: absolute;
  &:hover{
    outline: 1px dashed #999;
  }
}
.element-box{
  font-size: 12px;
  .circle{
    position: absolute;
    width: 11px;
    height: 11px;
    border: 1px solid #29AAAF;
    background: #fff;
    border-radius: 50%;
    &.right-top{
      right: -6px;
      top: -6px;
      cursor: ne-resize;
    }
    &.left-top{
      left: -6px;
      top: -6px;
      cursor: nw-resize;
    }
    &.right-bottom{
      right: -6px;
      bottom: -6px;
      cursor: se-resize;
    }
    &.left-bottom{
      left: -6px;
      bottom: -6px;
      cursor: sw-resize;
    }
    &.rotate{
      top: -30px;
      left: calc(50% - 6px);
      cursor: url(@/assets/images/rotate.png) 10 10 ,default;
    }
  }
  .top{
    left: 0;
    top: 0;
    cursor: n-resize;
    .barstyle();
    .circle{
      left: calc(50% - 6px);
      top: -6px;
    }
  }
  .bottom{
    left: 0;
    bottom: 0;
    cursor: s-resize;
    .barstyle();
    .circle{
      left: calc(50% - 6px);
      top: -6px;
    }
  }
  .right{
    .barstyle();
    top: 0;
    right: 0;
    height: 100%;
    width: 1px;
    cursor: e-resize;
    .circle{
      left: -6px;
      top: calc(50% - 6px);
    }
  }
  .left{
    .barstyle();
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    cursor: w-resize;
    .circle{
      left: -6px;
      top: calc(50% - 6px);
    }
  }
  .bar{
    display: none;
  }
  &.selected{
    .bar{
      display: block;
    }
  }
  .rotate-line{
    position: absolute;
    height: 20px;
    width: 1px;
    background: #29AAAF;
    top: -20px;
    left: 50%;
  }
}

</style>