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
    <div class="elements-box" style="position: relative; width: 100%; height: 100%;"
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
    </div>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue'
import ImgEl from "./ImgEl";
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

  }
})
</script>

<style scope lang="less">
.smart-ele{
  position: absolute;
}
</style>