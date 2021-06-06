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

<style scoped lang="less">
.ele-setting {
  width: 260px;
}
</style>
