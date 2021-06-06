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
            </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue"
import { useStore } from "../../store";
export default defineComponent({
  setup(){
    const store = useStore();
    const collapseActiveName = ref("basicInfo");
    // methods
    const changeImage = () => {
      
    }
    return{
      collapseActiveName,
      elementType: computed(() => store.state.element.selectedElement?.type),
      elementImg: computed(() => store.state.element.selectedElement?.src),
      changeImage
    }
  }
})
</script>

<style scoped lang="less">
.img-cont{
	width: 100%;
	display: flex;
	flex-direction: row;
	.img-show{
		flex: 3;
		height: 100px;
		background: url('../../../assets/img/bgblank.png');
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