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
async function getListCategoryParentClient() {
  return new Promise((resolve, reject) => {
    axios
      .GET(CATEGORIES_URL + "/client/tree", null)
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

async function editCategoryChildren(categoryId, params) {
  return new Promise((resolve, reject) => {
    axios
      .PUT(CATEGORIES_URL + "/custom/update?categoryId=" + categoryId, params)
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}

async function deleteCategoryChildren(id) {
  return new Promise((resolve, reject) => {
    axios
      .DELETE(CATEGORIES_URL + "/delete?id=" + id, "")
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}
async function getChildrenById(id) {
  return new Promise((resolve, reject) => {
    axios
      .GET(CATEGORIES_URL + "/tree/by-id?parentId=" + id, "")
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => reject(err));
  });
}
async function searchCategory(params) {
  return new Promise((resolve, reject) => {
    axios
      .GET(CATEGORIES_URL + "/search", params)
      .then((res) => {
        if (res) {
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

async function searchCategoryByCode(params) {
  return new Promise((resolve, reject) => {
    axios
      .GET(CATEGORIES_URL + "/tree/by-code", params)
      .then((res) => {
        if (res) {
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

export {
  getListCategoryParent,
  addNewCategoryChildren,
  editCategoryChildren,
  deleteCategoryChildren,
  getChildrenById,
  getListCategoryParentClient,
  searchCategory,
  searchCategoryByCode,
};
