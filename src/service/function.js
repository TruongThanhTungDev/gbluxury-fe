import { URL } from "@/api/constant";

export const getPartName = (part, pos) => {
  if (!part) return "";
  const cutPart = part.split("/");
  return pos ? cutPart[pos] : cutPart[1];
};

export const getListItemDefault = (number = 0) => {
  const items = [];
  for (let i = 0; i < number; i++) {
    items.push(i + 1);
  }
  return items;
};

export const getPageNumber = (count = 0, limit = 10) => {
  if (count <= 0) return 1;
  return Math.ceil(count / limit);
};

export const getUrlImage = (url) => {
  return URL + url;
};

export const convertDataForJson = (value) => {
  const result = JSON.parse(value);
  if (Array.isArray(result)) return result;
  if (typeof result === "string") return [result];
  return [];
};

export const getDotFile = (name) => {
  if (!name) return "";
  return name.split(".")[1];
};

export const downloadFile = ({ filename, url }) => {
  if (url) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
  }
};
