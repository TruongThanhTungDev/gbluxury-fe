import { notification } from "ant-design-vue";

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export default {
  success: (description) =>
    openNotification("success", "성공적으로", description),
  error: (description) => openNotification("error", "오류", description),
  info: (description) => openNotification("info", "", description),
  warning: (description) => openNotification("warning", "경고", description),
};
