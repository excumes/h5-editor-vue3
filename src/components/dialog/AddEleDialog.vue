<template>
  <transition name="el-fade-in-linear">
    <div class="overlay" v-if="modelValue">
      <div class="dialog">
        <div class="header">
          <div class="title">{{ title }}</div>
          <div class="close-btn el-icon-close" @click="closeDialog"></div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    modelValue: Boolean,
    title: String,
  },
  setup(props, ctx) {
    const closeDialog = () => {
      ctx.emit("update:modelValue", false);
    };
    return {
      closeDialog,
    };
  },
});
</script>

<style scoped lang="less">
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
.dialog {
  width: 960px;
  height: 600px;
  margin: 10vh auto 0;
  .header {
    height: 50px;
    width: 100%;
    background: #15484b;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
      color: #fff;
      padding-left: 20px;
      line-height: 50px;
    }
    .close-btn {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
  }
  .content {
    height: 550px;
    overflow: auto;
    background: #fff;
  }
}
</style>
