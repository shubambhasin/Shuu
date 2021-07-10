import toast from "react-hot-toast";

export const notify = (message) => {
  toast(message, {
    duration: 2000,
  });
};