<template>
  <div class="home-wrap">
    <header>
      <div class="logo">
      </div>
    </header>
    <main>
      <Pages v-if="curPageData"/>
      <Editor v-if="curPageData"/>
      <Tools v-if="curPageData"/>
      <PageSetting v-if="curPageData"/>
      <!-- <EleSetting/> -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref} from "vue";
import { useStore } from "../store/index"
import Pages from "../components/controllers/Pages.vue";
import Editor from "../components/controllers/Editor.vue";
import PageSetting from "../components/controllers/PageSetting.vue";
import Tools from "../components/controllers/Tools.vue";
import EleSetting from "../components/elements/EleSetting.vue";

export default defineComponent({
  name: "app",
  components: {
    Tools,
    Pages,
    Editor,
    PageSetting,
    EleSetting
  },
  setup(){
    const store = useStore();
    onMounted(() => {
      store.dispatch('page/getPageData');
    })
    return {
      curPageData : computed(() => store.state.page.currentPageData),
    }
  }
});
</script>

<style scoped lang="less">
@gray: #15484b;
.home-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  header {
    height: 60px;
    width: 100%;
    background: @gray;
    display: flex;
    z-index:999;
    .logo {
      font-size: 20px;
      width: 170px;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-weight: bold;
      background: url(../assets/images/cake.png) no-repeat center #0f2e31;
      background-size: 50px;
    }
  }
  main {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }
}

</style>
