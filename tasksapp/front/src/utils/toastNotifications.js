import { toast } from "react-toastify";

const DEFAULT_NOTIFICATION_OPTIONS = {
  position: toast.POSITION.TOP_LEFT,
  autoClose: 3500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: false,
  draggable: false,
  pauseOnHover: true,
};

export function showNotification(alertMsg="Something went wrong...", alertType="error", options = {}) {
  const notificationOptions = { ...DEFAULT_NOTIFICATION_OPTIONS, ...options };
  toast[alertType](alertMsg, {
    toastId: 1,
    ...notificationOptions,
  });
}
