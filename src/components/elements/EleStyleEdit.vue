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
                        <!-- <color-picker 
                            :colorData="$store.state.element.currentElData.style.backgroundColor" 
                            @get-color="getColor" 
                            type="backgroundColor"
                        /> -->
                </el-form>
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
      console.log(colorVal);
      store.commit('element/setCurDataColor', { type: 'backgroundColor', colorVal })
    }
    return{
      collapseActiveName,
      elementType: computed(() => store.state.element.selectedElement?.type),
      elementImg: computed(() => store.state.element.selectedElement?.src),
      curElementBg: computed(() => {
        if(store.state.element.selectedElement){
          return store.state.element.selectedElement
        }
        return "rgba(0,0,0,0)"
      }),
      changeImage,
      changeBg
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
</style>
<style>
.el-tabs__content{
  padding: 0 10px;
}
</style>