import { Module } from "vuex";
import { RootState } from "../index";
import { Element } from "../types";
export interface ElementState {
  selectedElIds: String[];
  selectedElement: null | Element;
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
    setOpacity(state, val){
      if(state.selectedElement){
        state.selectedElement.style.opacity = val;
      }
    },
    setCurDataColor(state, { type, colorVal }) {
      if (state.selectedElement) {
        if (type == "backgroundColor") {
          state.selectedElement.style.backgroundColor = colorVal;
        }
        if (type == "borderColor") {
          state.selectedElement.style.borderColor = colorVal;
        }
        if (type == "boxShadowColor") {
          state.selectedElement.style.boxShadowColor = colorVal;
        }
        if (type == "fontcolor") {
          state.selectedElement.style.color = colorVal;
        }
      }
    },
  },
};
