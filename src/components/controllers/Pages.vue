<template>
  <div class="pages">
    <div class="page-list">
      <div class="page" v-for="(page, index) in pages" :key="page.id">
        <div class="number">{{ index + 1 }}</div>
        <div class="text">第{{ index + 1 }}页</div>
        <div class="menu">...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "/@/store/store.ts";
export default defineComponent({
  setup() {
    const store = useStore();
    return {
      pages: computed(() => store.state.pageData?.pages),
    };
  },
});
</script>

<style lang="less" scoped>
.pages {
  width: 170px;
  height: 100%;
  background: #fff;
  position: relative;
  .page-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 40px;
    overflow-y: auto;
  }
  .page-btn {
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 40px;
    background: #eeeeee;
    .btn {
      width: 100%;
      height: 100%;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      transition: all 0.2s 0s ease;
      background: #157174;
    }
    :hover {
      background: #059598;
    }
  }
  .page {
    width: 100%;
    text-align: center;
    cursor: pointer;
    background: #fafafa;
    border-bottom: 1px solid #e6ebed;
    height: 59px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .number {
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      background: #bbbbbb;
      width: 20px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      margin: 0 10px;
    }
    .text {
      font-size: 14px;
      color: #333;
      text-align: left;
      flex: 1;
    }
    .menu {
      color: #333333;
      font-size: 14px;
      height: 59px;
      line-height: 59px;
      padding: 0 15px;
    }
  }
  .page.active {
    background: #e6ebed;
    .number {
      background: #15484b;
    }
  }
}
</style>
