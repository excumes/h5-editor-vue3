import { createStore, createLogger, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue"
import * as api from "../api/index";

interface State {
    pageData: Object
}
// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

// 使用modules 不知道为什么会丢失state类型，
export const store =  createStore<State>({
  state: {
    //页面json
    pageData: {},
  },
  mutations: {
    setPageData(state, data) {
      state.pageData = data;
    },
  },
  actions: {
    async getPageData({ commit }) {
      const data = await api.getData();
      console.log(data);
      commit("setPageData", data);
    },
  },
//   输出日志
//   plugins: [createLogger()],
});

// 定义自己的 useStore 组合函数
export function useStore(){
    return baseUseStore(key);
}