// * Packages Import * //
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

// * Component Import * //
import CustomInput from "../Common/CustomInput";

// *  Utils Import * //
import { studentLogin, domain, tutorLogin } from "../../utils/urls";
import { header } from "../../utils/cookieChecker";
import { toastSetting } from "../../utils/toastSettings";
import {
  fillAllFiledsMessage,
  commonErrorMessage,
} from "../../data/toastMessages";

// *  Styles Import * //
import Styles from "../../styles/SigninForm.module.scss";

const SignInForm = ({ setSignin, userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  
  const updatedCookies = (user) => {
    cookies.set("auth_token", user?.auth_token);
    cookies.set("user_role", user?.user_role);
    cookies.set("class_grade", user?.class_grade);
    cookies.set("language", user?.language);
    cookies.set("user_id", user?.user_id);
    cookies.set("user_name", user?.user_name);
    cookies.set("email", user?.email);
    cookies.set("subjects", user?.subjects);

    console.log(cookies.get("auth_token"))
  };

  const handleSubmit = () => {
    if (!email || !password || !userType) {
      toast.error(
        `${fillAllFiledsMessage}. Also check if you have selected User Type.`,
        toastSetting
      );
      return;
    }

    const body = {
      email,
      password,
    };
    axios
      .post(
        userType.value === "STUDENT" ? studentLogin : tutorLogin,
        body,
        header()
      )
      .then((data) => {
        toast.success(
          data?.data?.message || "Logged in successfully",
          toastSetting
        );
        updatedCookies(data?.data?.user);
        window.open(
          `/${userType.value === "STUDENT" ? "students" : "tutors"}/dashboard`
        );
      })
      .catch((err) => {
        console.error(err?.message);
        toast.error(
          err?.response?.data?.message || err?.message || commonErrorMessage,
          toastSetting
        );
      });
  };

  return (
    <div className={Styles.mainSigninConatiner}>
      <div className={Styles.formContainer}>
        <h2>{userType?.label} Log in</h2>
        <CustomInput
          name="Email"
          label="Email"
          placeholder="Enter Your Email Id Here."
          value={email}
          multiline={false}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          positionAdornment="end"
        />

        <CustomInput
          name="Password"
          label="Password"
          placeholder="Enter Your Password Here."
          value={password}
          multiline={false}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          positionAdornment="end"
        />

        <button
          type="submit"
          className={Styles.subtmitButton}
          onClick={handleSubmit}
        >
          Log In
        </button>
        <div className={Styles.signupDescription}>
          {" "}
          If you are not a member. Please try{" "}
          <button
            className={Styles.signupButton}
            onClick={() => setSignin((signin) => !signin)}
          >
            Siging Up
          </button>{" "}
          first.
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
