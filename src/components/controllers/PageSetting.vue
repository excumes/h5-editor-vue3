<template>
  <div class="page-setting">
    <div class="page-set-title">背景设置</div>
    <div class="page-set-background-img">
      <div class="label">
        <span>背景图</span>
      </div>
      <div class="box">
        <img :src="bgImg" v-if="bgImg" alt="" />
      </div>
      <div class="btns">
        <el-button @click="deleteBgImg" v-if="bgImg">删除图片</el-button>
        <el-button @click="changeBgImgBtn" v-if="bgImg">更换图片</el-button>
        <el-button @click="changeBgImgBtn" v-else>添加图片</el-button>
      </div>
    </div>
    <el-form label-width="70px" @submit.prevent>
      <el-form-item label="背景颜色">
        <ColorPicker @change="pickBgColor" />
      </el-form-item>
      <el-form-item label="背景动画">
        <el-select :modelValue="bgAnimation" @change="pageAnimationChange">
          <el-option
            v-for="(label, index) in pageAnimations.label"
            :label="label"
            :value="index"
            :key="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动画时间" v-if="bgAnimation !== '无'">
        <el-slider v-model="aniDurationRef" 
          show-input 
          input-size="mini"
          :show-input-controls="false" 
          :show-tooltip="false" 
          :max=20
          :min=1
          @change="changeAniDuration"
        ></el-slider>
      </el-form-item>
    </el-form>
    <div class="page-set-title">页面滤镜</div>
    <div class="filter-list" :class="{ more: filterMore}">
      <div class="item" v-for="item in filters" :key="item.id" 
        @click="changeFilter(item)"
        :class="{ active: curFilter == item.value}"
      >
        <div class="img" :style="{filter: item.value}"></div>
        <div class="name">{{ item.label }}</div>
      </div>
    </div>
    <div class="filter-more" :class="{more: filterMore}" @click="filterMore = !filterMore">
      {{ filterMore ? '收起': '更多' }}
      <i class="el-icon-arrow-down"></i>
    </div>
  </div>
  <!-- teleport 会把真实的dom放到选择的元素里  to="css选择器"-->
  <Teleport to="body">
    <AddEleDialog v-model="dialogShow" title="背景设置">
      <BackgroundList @closeDialog="closeDialog" />
    </AddEleDialog>
  </Teleport>
</template>

<script>
import { useStore } from "../../store";
import { defineComponent, ref, computed } from "vue";
import AddEleDialog from "../dialog/AddEleDialog.vue";
import BackgroundList from "../dialog/BackgroundList";
import ColorPicker from "../common/ColorPicker.vue";
import { pageAnimations } from "@/utils/animationsData";
import { filters } from "@/utils/filtersData";
export default defineComponent({
  components: {
    AddEleDialog,
    BackgroundList,
    ColorPicker,
  },
  setup(props, ctx) {
    const store = useStore();
    const curPagePlayAmRef = ref("none");
    // 背景图片
    const dialogShow = ref(false);
    const changeBgImgBtn = () => {
      dialogShow.value = true;
    };
    const deleteBgImg = () => {
      store.commit("page/setCurPageDataBackground", { type: "bgImage", image: "" });
    };
    const closeDialog = () => {
      dialogShow.value = false;
    };
    // 背景颜色
    const pickBgColor = (color) => {
      console.log(color);
      store.commit("page/setCurPageDataBackground", { type: "bgColor", color });
    };
    // 背景动画
    const pageAnimationChange = (index) => {
      store.commit("page/setCurPageDataBackground", { type: 'animation', label: pageAnimations.label[index], value: pageAnimations.value[index]})
    }
    const changeAniDuration = (value) => {
      store.commit("page/setCurPageDataBackground", {type: 'duration', value: value})
    }
    const aniDurationRef = ref(store.state.page.currentPageData.background.animation.animationDuration);
    //滤镜
    const changeFilter = (filter) => {
      store.commit("page/setCurPageDataBackground", {type: "filter", value: filter.value})
    }
    const filterMore = ref(false);
    return {
      bgImg: computed(() => store.state.page.currentPageData?.background.style.backgroundImage),
      curPagePlayAmRef,
      dialogShow,
      changeBgImgBtn,
      deleteBgImg,
      closeDialog,
      pickBgColor,
      bgAnimation: computed(() => store.state.page.currentPageData.background.animation.animationLabel),
      pageAnimations,
      pageAnimationChange,
      aniDurationRef,
      changeAniDuration,
      filters,
      changeFilter,
      curFilter: computed(() => store.state.page.currentPageData.background.style.filter),
      filterMore,
    };
  },
});
</script>

<style scoped lang="less">
.page-setting {
  width: 240px;
  overflow-y: auto;
  padding: 0 10px;
}
.page-set-title {
  font-size: 16px;
  line-height: 2.5;
  border-bottom: 1px solid #ddd;
}
.page-set-background-img {
  margin: 10px 0;
  .label {
    font-size: 14px;
    color: #666;
    span {
      margin-left: 10px;
    }
  }
  .box {
    height: 140px;
    margin: 10px;
    border: 1px solid #e6e6e6;
    background: url(../../assets/images/bgblank.png);
    text-align: center;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  .btns {
    text-align: right;
  }
}
.filter-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
  overflow: hidden;
  height: 170px;
  transition: .3s;
  &.more{
    height: 520px;
  }
  .item{
    width: 48px;
    height: 80px;
    background: pink;
    cursor: pointer;
    margin: 0 4px 5px;
    border: 1px solid #fff;
    &.active{
      border-color: #76CBCB;
    }
    .img{
      height: 60px;
      width: 100%;
      background: url(@/assets/images/filter.png) no-repeat center;
    }
    .name{
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      background: #fff;
    }
  }
}
.filter-more{
  text-align: center;
  font-size: 12px;
  color: #666;
  line-height: 2.5;
  cursor: pointer;
  i{
    padding-left: 5px;
    transition: .3s;
  }
  &.more{
    i{
      transform: rotate(-180deg);
    }
  }
}
</style>
<style lang="less">
.page-setting{
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
  .el-form-item{
    margin-bottom: 10px;
  }
}
</style>