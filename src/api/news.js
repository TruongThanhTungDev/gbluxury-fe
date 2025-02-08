import * as axios from "@/service/axios";
import { NEW_URL, UPLOAD_IMAGE } from "./constant";
async function addNews(params) {
  return new Promise((resolve, reject) => {
    axios
      .POST(NEW_URL + "/custom/create", params)
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
async function getNewsAdmin(params) {
  return new Promise((resolve, reject) => {
    axios
      .GET(NEW_URL + "/search/custom", params)
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
async function getDetailNewsAdmin(id) {
  return new Promise((resolve, reject) => {
    axios
      .GET(NEW_URL + "/detail?id=" + id, "")
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

async function uploadImageNews(file) {
  const form = new FormData();
  form.append("file", file);
  console.log('form.get', form.get('file'));
  return new Promise((resolve, reject) => {
    axios
      .POST_FILE(UPLOAD_IMAGE + "/upload", form)
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

export { addNews, getNewsAdmin, getDetailNewsAdmin, uploadImageNews };
