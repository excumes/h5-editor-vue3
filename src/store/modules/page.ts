import { Module } from "vuex";
import { PageData } from "../types";
import { RootState } from "../index";
import * as api from "../../api/index";

export interface Pagestate {
  pageData: PageData | null;
  currentPageData: any;
  addEleDialog: {
    show: Boolean;
    type: Number;
  };
  backgroundList: String[];
}
  
export const pageModule: Module<Pagestate, RootState> = {
  namespaced: true,
  state: {
    //页面json
    pageData: null,
    currentPageData: null,
    addEleDialog: {
      show: false,
      type: 1,
    },
    backgroundList: [],
  },
  mutations: {
    setPageData(state, data) {
      state.pageData = data;
    },
    setCurrentPageData(state, data) {
      // 进入页面时先清空动画
      // ...
      state.currentPageData = data;
    },
    setCurPageDataBackground(state, data) {
      if (data.type == "bgImage") {
        state.currentPageData.background.style.backgroundImage = data.image;
      }
      if (data.type == "bgColor") {
        if (state.currentPageData) {
          state.currentPageData.background.style.backgroundColor = data.color;
        }
      }
      if (data.type === "animation") {
        state.currentPageData.background.animation.animationLabel = data.label;
        state.currentPageData.background.animation.animationName = data.value;
      }
      if (data.type === "duration") {
        state.currentPageData.background.animation.animationDuration =
          data.value;
      }
      if (data.type === "filter") {
        state.currentPageData.background.style.filter = data.value;
      }
    },
  },
  actions: {
    async getPageData({ commit }) {
      const data = await api.getData();
      commit("setPageData", data);
      commit("setCurrentPageData", data.pages[0]);
    },
  },
};

