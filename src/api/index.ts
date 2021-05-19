import  pageData from "../assets/data/pageData.json";
import  resData from "../assets/data/resData.json";
export const getData = () => {
    return Promise.resolve(pageData);
}

export const getBackgroundList = () => {
    return Promise.resolve(resData.backgroundList);
}

export const getImgList = () => {
    return Promise.resolve(resData.imgList);
}