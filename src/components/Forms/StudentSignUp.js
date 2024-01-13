// * Packages Import * //
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// * Component Import * //
import CustomInput from "../Common/CustomInput";
import CustomAutocomplete from "../Common/CustomAutocomplete";

// * Utils Import * //
import { studentLanguages, studentGrades } from "../../data/homepageData";
import { studentSignup } from "../../utils/urls";
import { header } from "../../utils/cookieChecker";
import { toastSetting } from "../../utils/toastSettings";
import {
  fillAllFiledsMessage,
  commonErrorMessage,
} from "../../data/toastMessages";

// * Styles Import * //
import Styles from "../../styles/SigninForm.module.scss";

const StudentSignUp = ({ setSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(null);
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !password || !name || !grade || !language) {
      toast.error(fillAllFiledsMessage, toastSetting);
      return;
    }
    setLoading(true);
    const body = {
      email,
      password,
      name,
      class_grade: grade.value,
      language: language.value,
    };
    axios
      .post(studentSignup, body, header())
      .then((data) => {
        toast.success(
          data?.data?.message ||
            "Student registered successfully. Please log in to continue.",
          toastSetting
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err?.message);
        toast.error(
          err?.response?.data?.message || err?.message || commonErrorMessage,
          toastSetting
        );
        setLoading(false);
      });
  };

  return (
    <div className={Styles.mainSigninConatiner}>
      <div className={Styles.formContainer}>
        <h2>STUDENT SIGN UP</h2>
        <CustomInput
          name="Name"
          label="Name"
          placeholder="Enter Your Name Here."
          value={name}
          multiline={false}
          onChange={(e) => {
            setName(e.target.value);
          }}
          positionAdornment="end"
        />

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

        <CustomAutocomplete
          variant="inside"
          label="Language"
          placeholder="Select Language"
          options={studentLanguages}
          onChange={(option) => setLanguage(option)}
          value={language}
          getOptionLabel={(option) => (option && option.label) || ""}
          isOptionEqualToValue={(option) =>
            language.value && option?.value === language.value
          }
          renderOption={(option) => <div>{option.label}</div>}
          disableClearable={false}
          filterOptions={(x) => x}
        />

        <CustomAutocomplete
          variant="inside"
          label="Grade"
          placeholder="Select Grade"
          options={studentGrades}
          onChange={(option) => setGrade(option)}
          value={grade}
          getOptionLabel={(option) => (option && option.value) || ""}
          isOptionEqualToValue={(option) =>
            grade.value && option?.value === grade.value
          }
          renderOption={(option) => <div>{option.value}</div>}
          disableClearable={false}
          filterOptions={(x) => x}
        />

        <button
          type="submit"
          className={Styles.subtmitButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Sign up"}
        </button>

        <div className={Styles.signupDescription}>
          {" "}
          If you are already a member. Please try{" "}
          <button
            className={Styles.signupButton}
            onClick={() => setSignin((signin) => !signin)}
          >
            Loging In
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
