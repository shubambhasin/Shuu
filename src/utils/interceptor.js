import { instance } from "../api/axiosapi";
import { Toaster } from "react-hot-toast";
import { notify } from "./notification";

function Interceptor() {
  const addErrorInterceptor = () => {
    instance.interceptors.response.use(
      (response) => {
        if (response !== undefined) {
          // console.log("from interceptors response", response);
          return response;
        }
      },
      (error) => {
        console.log("from interceptors error", error);
        if (error.response) {
          const code = error.response.status;
          console.log(code);
          if (code === 401) {
            notify("Already in wishlist ❌");
            console.log("already in wishlist");
          }
          if (code === 400) {
            notify("Already in cart ❌");
            console.log("already in cart");
          }

          if (code === 404) {
            notify("Email not registered, please register first ! ❌");
            console.log("Email not registered 404");
          }
        }
      }
    );
  };

  addErrorInterceptor();

  return (
    <>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default Interceptor;
