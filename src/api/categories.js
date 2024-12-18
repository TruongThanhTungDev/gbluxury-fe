import * as axios from "@/service/axios";
import { CATEGORIES_URL } from "./constant";
async function getListCategoryParent() {
  return new Promise((resolve, reject) => {
    axios
      .GET(CATEGORIES_URL + "/tree", null)
      .then((res) => {
        if (res && res.length) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
async function addNewCategoryChildren(params) {
  return new Promise((resolve, reject) => {
    axios.POST(CATEGORIES_URL + '/custom/create', params).then(res => {
      if (res) {
        resolve(res)
      } else {
        resolve(res)
      }
    })
    .catch(err => reject(err))
  })
}
export { getListCategoryParent, addNewCategoryChildren };
