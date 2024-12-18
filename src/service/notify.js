import { notification } from "ant-design-vue";

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default {
  success: (description) =>
    openNotification("success", "Thành công", description),
  error: (description) => openNotification("error", "Lỗi", description),
  info: (description) => openNotification("info", "Thông báo", description),
  warning: (description) => openNotification("warning", "Cảnh báo", description),
};
