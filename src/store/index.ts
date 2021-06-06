import {createStore , Store, useStore as baseUseStore,} from "vuex";
import { InjectionKey } from "vue";
import {pageModule, Pagestate} from "./modules/page"
import { elementModule, ElementState } from "./modules/element"
export interface RootState {
}

// 定义 injection key
export const key: InjectionKey<Store<RootState>> = Symbol('store-key');

export const store = createStore<RootState>({
  modules: {
    page: pageModule,
    element: elementModule,
  },
  //   输出日志
  //   plugins: [createLogger()],
});

interface AllState extends Pagestate{
  page: Pagestate,
  element: ElementState
}

// 定义自己的 useStore 组合函数
export function useStore<T = AllState>() {
  return baseUseStore<T>(key);
}
