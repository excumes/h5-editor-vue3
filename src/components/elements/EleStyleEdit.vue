<template>
  <div class="style-edit">
    <el-collapse v-model="collapseActiveName">
            <!-- 基础信息 -->
            <el-collapse-item title="基础信息" name="basicInfo">
                <!-- 图片 -->
                <div class="img-cont" v-if="elementType == 1">
                    <div class="img-show">
                        <img :src="elementImg"/>
                    </div>
                    <div class="img-btns">
                        <el-button size="medium" type="primary" plain icon="el-icon-refresh" @click="changeImage">更换图片</el-button>
                        <el-button size="medium" type="primary" plain icon="el-icon-scissors">裁剪图片</el-button>
                    </div>
                </div>
                <el-form label-width="70px" @submit.prevent>
                  <el-form-item label="背景颜色">
                    <ColorPicker :colorData="curElementBg" type="backgroundColor" @change="changeBg"/>
                  </el-form-item>
                  <el-form-item label="透明度">
                    <el-slider :modelValue="elementOpacity" 
                      @update:modelValue="changeOpacity"
                      :show-input="true"
                      :show-input-controls="false"
                      input-size="mini" 
                      :show-tooltip="false"
                    />
                  </el-form-item>
                </el-form>
            </el-collapse-item>
            <!-- 尺寸与位置 -->
            <el-collapse-item title="尺寸与位置" name="2">
                <!-- 对齐快捷键 -->
                <div class="position-align">
                    <el-tooltip class="item" effect="dark" content="左对齐" placement="bottom">
                        <div class="item iconfont icon-zuoduiqi"></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="左右居中" placement="bottom">
                        <div class="item iconfont icon-shuipingjuzhongduiqi"></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="右对齐" placement="bottom">
                        <div class="item iconfont icon-youduiqi"></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="上对齐" placement="bottom">
                        <div class="item iconfont icon-shangduiqi"></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="上下居中" placement="bottom">
                        <div class="item iconfont icon-chuizhijuzhongduiqi"></div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下对齐" placement="bottom">
                        <div class="item iconfont icon-xiaduiqi"></div>
                    </el-tooltip>
                </div>
            </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue"
import { useStore } from "../../store";
import ColorPicker from "@/components/common/ColorPicker.vue"
export default defineComponent({
  components:{
    ColorPicker
  },
  setup(){
    const store = useStore();
    const collapseActiveName = ref("basicInfo");
    // methods
    const changeImage = () => {
      
    }
    const changeBg = (colorVal) => {
      store.commit('element/setCurDataColor', { type: 'backgroundColor', colorVal })
    }
    const changeOpacity = (val) => {
      store.commit('element/setOpacity', val);
    }
    return{
      collapseActiveName,
      elementType: computed(() => store.state.element.selectedElement?.type),
      elementImg: computed(() => store.state.element.selectedElement?.src),
      elementOpacity: computed(() => store.state.element.selectedElement?.style.opacity),
      curElementBg: computed(() => {
        if(store.state.element.selectedElement){
          return store.state.element.selectedElement
        }
        return "rgba(0,0,0,0)"
      }),
      changeImage,
      changeBg,
      changeOpacity
    }
  }
})
</script>

<style scoped lang="less">
.img-cont{
	width: 100%;
	display: flex;
	flex-direction: row;
  margin-bottom: 10px;
	.img-show{
		flex: 3;
		height: 100px;
		background: url(@/assets/images/bgblank.png);
		border: 1px solid #E6E6E6;
		img{
			object-fit:contain;
			width: 100%;
			height: 100%;
		}
	}
	.img-btns{
		flex: 2;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		.el-button{
			margin: 5px 0;
		}
		.el-button--medium{
			padding: 10px 12px;
		}
	}
}
.position-align{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .item{
        cursor: pointer;
        font-size: 24px;
        outline: none;
    }
}

@font-face {
  font-family: "iconfont"; /* Project id 2617760 */
  src: url('//at.alicdn.com/t/font_2617760_e1f0l13nkup.woff2?t=1623942889726') format('woff2'),
       url('//at.alicdn.com/t/font_2617760_e1f0l13nkup.woff?t=1623942889726') format('woff'),
       url('//at.alicdn.com/t/font_2617760_e1f0l13nkup.ttf?t=1623942889726') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-chuizhijuzhongduiqi:before {
  content: "\e654";
}

.icon-shangduiqi:before {
  content: "\e657";
}

.icon-shuipingjuzhongduiqi:before {
  content: "\e658";
}

.icon-xiaduiqi:before {
  content: "\e65a";
}

.icon-youduiqi:before {
  content: "\e65b";
}

.icon-zuoduiqi:before {
  content: "\e65c";
}

</style>
<style>
.el-tabs__content{
  padding: 0 10px;
}
</style>