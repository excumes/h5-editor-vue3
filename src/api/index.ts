import  pageData from "../assets/data/pageData.json";
export const getData = () => {
    return Promise.resolve(pageData);
}