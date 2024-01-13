import {domain } from "../utils/urls";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const header = () => {
  let auth_token = cookies.get("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${auth_token}`,
      "Content-Type": "application/json",
    },
  };
};

export const multipartHeader = () => {
  let auth_token = cookies.get("auth_token");
  return {
    headers: {
      Authorization: `Bearer ${auth_token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

export const getUserDetails = () => {
  return {
    authToen: cookies.get("auth_token"),
    userRole: cookies.get("user_role"),
    grade: cookies.get("class_grade"),
    language: cookies.get("language"),
    userId: cookies.get("user_id"),
    name: cookies.get("user_name"),
    email: cookies.get("email"),
    subjects: cookies.get("subjects"),
  };
};



export const removeAllCookies = () => {
  const allCookieNames = cookies.getAll();
  Object.keys(allCookieNames).map((cookieName) => cookies.remove(`${cookieName}`)
  );
};
