<template>
  <div class="ele-setting">
    <el-tabs stretch v-model="tabsActiveName">
      <el-tab-pane label="样式" name="style">
        <EleStyleEdit/>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animate">
        动画
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  // 试一下新特性
  import { ref } from "vue";
  import EleStyleEdit from "./EleStyleEdit";
  const tabsActiveName = ref("style");
</script>

<style lang="less">
.ele-setting {
  width: 260px;
  .el-slider__button{
		width: 12px;
		height: 12px;
	}
	.el-slider__input{
		width: 50px;
	}
  .el-input-number--mini .el-input__inner{
		padding: 0;
	}
	.el-slider__runway.show-input{
		margin-right: 65px;
		margin-left: 5px;
	}
  .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
		display: none;
	}
}
</style>
