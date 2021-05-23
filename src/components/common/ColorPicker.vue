<template>
  <div class="color-picker">
    <!-- <div class="color-picker-inner" :class="{small:pickerModel=='small'}"> -->
    <el-color-picker
      show-alpha
      v-model="colorRef"
      @active-change="colorChange"
      :predefine="predefineColors"
    ></el-color-picker>
    <div class="pre-colors">
      <div
        :class="['color-item', color == 'rgba(0,0,0,0)' ? 'transparent' : '']"
        v-for="(color, index) in presetColors"
        :key="index"
        :style="{ backgroundColor: color }"
        @click="choseColor(color)"
      ></div>
    </div>
  </div>
</template>
<style scoped lang="less">
.color-picker {
  height: 40px;
}
.pre-colors {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 10px;
  .color-item {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.transparent {
      background-image: url(/@/assets/images/bgblank.png);
    }
  }
}
</style>
<style lang="less">
.color-picker {
  display: flex;
  justify-content: space-between;
  .el-color-picker {
    display: block;
  }
  .el-color-picker__trigger {
    width: 70px;
  }
  .color-picker-inner.small {
    .el-color-picker__trigger {
      width: 40px;
    }
    .pre-colors {
      display: none;
    }
  }
}
</style>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "/@/store/store.ts";
export default defineComponent({
  setup(props, ctx) {
    const store = useStore();
    const colorRef = ref("rgba(255,255,255,1)");
    const colorChange = (color) => {
      ctx.emit("change", color);
    };
    // 预设颜色
    const presetColors = [
      "#FFFFFF",
      "#FF5448",
      "#F2A653",
      "#FFCA28",
      "#18CFA1",
      "rgba(0,0,0,0)",
      "#4D8FF3",
      "#7171EF",
      "#4F5975",
      "#000000",
    ];
    const predefineColors = [
      "rgba(0,0,0,0)",
      "#EEF1F6",
      "#FFCBD0",
      "#BDE6FF",
      "#97ECB9",
      "#FFC36D",
      "#95F4E2",
      "#CCD0FF",
      "#ECCAF1",
      "#FFBED0",
      "#FFFFFF",
      "#A8B8D0",
      "#E77474",
      "#59C7F9",
      "#56B786",
      "#EA9924",
      "#2ECBBE",
      "#8D91FF",
      "#C277D0",
      "#FF79A2",
      "#000000",
      "#7A90B2",
      "#C4433C",
      "#2196ED",
      "#48916C",
      "#D67B03",
      "#23A193",
      "#696CB4",
      "#A158B3",
      "#BF4C76",
    ];
    const choseColor = (color) => {
      colorRef.value = color;
    };
    return {
      colorRef,
      colorChange,
      presetColors,
      choseColor,
      predefineColors,
    };
  },
});

// export default {
//   name: "colorPicker",
//   props: ["colorData", "pickerModel", "type"],
//   data() {
//     return {
//       data: null,
//       predefines: [
//         "#FFFFFF",
//         "#FF5448",
//         "#F2A653",
//         "#FFCA28",
//         "#18CFA1",
//         "rgba(0,0,0,0)",
//         "#4D8FF3",
//         "#7171EF",
//         "#4F5975",
//         "#000000",
//       ],
//       predefineColors: [
//         "rgba(0,0,0,0)",
//         "#EEF1F6",
//         "#FFCBD0",
//         "#BDE6FF",
//         "#97ECB9",
//         "#FFC36D",
//         "#95F4E2",
//         "#CCD0FF",
//         "#ECCAF1",
//         "#FFBED0",
//         "#FFFFFF",
//         "#A8B8D0",
//         "#E77474",
//         "#59C7F9",
//         "#56B786",
//         "#EA9924",
//         "#2ECBBE",
//         "#8D91FF",
//         "#C277D0",
//         "#FF79A2",
//         "#000000",
//         "#7A90B2",
//         "#C4433C",
//         "#2196ED",
//         "#48916C",
//         "#D67B03",
//         "#23A193",
//         "#696CB4",
//         "#A158B3",
//         "#BF4C76",
//       ],
//     };
//   },
//   computed: {
//     _thisColorData: {
//       get() {
//         return this.colorData;
//       },
//       set(val) {
//         this.$emit("get-color", this.type, val);
//       },
//     },
//   },
//   mounted() {},
//   methods: {
//     colorChange(val) {
//       this.$emit("get-color", this.type, val);
//     },
//     choseColor(val) {
//       this.$emit("get-color", this.type, val);
//     },
//   },
// };
</script>
