// import { notification } from "antd";
// import axios from "axios";

// // const baseURL = "https://ops.claimwolfgroup.com/api";
// const baseURL = "http://localhost:3000/api/";
// const authURL = "http://localhost:3000/";
// //  const authURL = "https://ops.claimwolfgroup.com";
// // const claim_Wolf = "https://.com/api/";

// export const userRequest = axios.create({
//   baseURL: baseURL,
// });
// export const authRequest = axios.create({
//   baseURL: authURL,
// });

// // export const userRequest_claim_Wolf = axios.create({
// //   baseURL: claim_Wolf,
// // });

// // export const emailRequestFromAd = axios.create({
// //   baseURL: adURL,
// //});

// //Add a request interceptor to include the Authorization header with the token

// userRequest.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// userRequest.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // Redirect to login page if token is missing
//       window.location.href = "/login";
//       return Promise.reject("No token found");
//     }
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// userRequest.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       //Token expired or invalid, redirect // to login page
//       localStorage.removeItem("token"); // Clear the token
//       window.location.href = "/login"; // Redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

// // userRequestForFL.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // emailRequestFromAd.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// userRequest.interceptors.response.use(
//   (response) => {
//     // console.log("response");
//     return response;
//   },
//   (error) => {
//     // console.log("error in api routes ", error);
//     const is401 = error.message === "Request failed with status code 401";
//     const is500 = error.message === "Request failed with status code 500";
//     const isTooManyReq = error?.response?.status === 429;
//     if (isTooManyReq) {
//       notification.error({
//         message: "Too Many Request",
//         description:
//           "You have exceeded the limit. Please try again after 15 minutes.",
//         placement: "topRight",
//         className: "font-inter font-medium",
//         duration: 0,
//       });
//     } else if (is401) {
//       // Check for token expiration
//       // Redirect to the sign-out page
//       // localStorage.removeItem("username");
//       // localStorage.removeItem("token");
//       // sessionStorage.clear();

//       // is401
//       //   ? toast.error("Session Expire Need to Signin Again")
//       //   : toast.error("Internal Server Error try later");

//       // window.location.href = "http://localhost:5173/login";
//     }
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import { notification } from "antd";

// ✅ Configure base URLs (use env in real projects)
const API_BASE_URL = "https://ops.claimwolfgroup.com/api";
const AUTH_BASE_URL = "https://ops.claimwolfgroup.com";
// const API_BASE_URL = "http://localhost:3000/api/";
// const AUTH_BASE_URL = "http://localhost:3000/";

// ✅ Axios instances
export const userRequest = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const authRequest = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 30000,
});

// ✅ Prevent multiple redirects at once
let isRedirecting = false;

const logoutAndRedirect = (message) => {
  if (isRedirecting) return;
  isRedirecting = true;

  // Clear auth data
  localStorage.removeItem("token");
  // localStorage.removeItem("username");
  // sessionStorage.clear();

  // Optional toast/notification
  notification.warning({
    message: "Session ended",
    description: message || "Please login again.",
    placement: "topRight",
  });

  // replace() prevents back navigation to protected page
  window.location.replace("/login");
};

// ✅ REQUEST interceptor (ONLY ONE)
// Attaches Bearer token if present.
// Do NOT redirect here — route guards / response 401 should handle auth flow.
userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ RESPONSE interceptor (ONLY ONE)
userRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const serverMessage = error?.response?.data?.message;

    // 401 = not authenticated (expired/invalid/missing token)
    if (status === 401) {
      logoutAndRedirect(serverMessage);
      return Promise.reject(error);
    }

    // 429 = rate limit
    if (status === 429) {
      notification.error({
        message: "Too Many Requests",
        description:
          "You have exceeded the limit. Please try again after 15 minutes.",
        placement: "topRight",
        duration: 0,
      });
      return Promise.reject(error);
    }

    // 500+ = server errors
    if (status >= 500) {
      notification.error({
        message: "Server Error",
        description:
          "Something went wrong on the server. Please try again later.",
        placement: "topRight",
      });
      return Promise.reject(error);
    }

    // Network / CORS / timeout
    if (!status) {
      notification.error({
        message: "Network Error",
        description: "Unable to reach server. Check your connection.",
        placement: "topRight",
      });
    }

    return Promise.reject(error);
  },
);
