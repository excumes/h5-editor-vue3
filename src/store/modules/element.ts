import { Module } from "vuex";
import { RootState } from "../index";
import { Element } from "../types"
export interface ElementState {
  selectedElIds: String[]
  selectedElement: null | Element
}
export const elementModule: Module<ElementState, RootState> = {
  namespaced: true,
  state: {
    selectedElIds: [],
    selectedElement: null,
  },
  mutations: {
    setSelectedIds(state, data) {
      state.selectedElIds = data;
    },
    setSelectElement(state, data) {
      state.selectedElement = data;
    },
  },
};
