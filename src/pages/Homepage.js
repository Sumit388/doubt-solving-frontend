// * Packages Import * //
import { useState } from "react";
import { ToastContainer } from "react-toastify";

// * Components Import * //
import CustomAutocomplete from "../components/Common/CustomAutocomplete";
import SignInForm from "../components/Forms/SignInForm";
import StudentSignUp from "../components/Forms/StudentSignUp";
import TutorSignUp from "../components/Forms/TutorSignUp";

// * Utils Import * //
import { userTypes } from "../data/homepageData";
import Styles from "../styles/Homepage.module.scss";

const Homepage = () => {
  const [userType, setUserType] = useState(userTypes[0]);
  const [signin, setSignin] = useState(true);

  return (
    <div className={Styles.homeContainer}>
      <ToastContainer />
      <div className={Styles.headingContainer}>
        <h1>Real-Time Doubt Solving Platform</h1>
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.descriptionContainer}>
          <p>
            "Unlocking Knowledge Seamlessly: A Revolutionary Real-Time Doubt
            Solving Platform for Swift and Effective Learning Experiences.
            Elevate Your Understanding with Instant Guidance and Interactive
            Support."
          </p>
          <div className={Styles.loginTypeContainer}>
            <span>Register as : </span>
            <div className={Styles.inputContainer}>
              <CustomAutocomplete
                variant="inside"
                label="User Type"
                placeholder="Select User Type"
                options={userTypes}
                onChange={(option) => setUserType(option)}
                value={userType}
                getOptionLabel={(option) => (option && option.label) || ""}
                isOptionEqualToValue={(option) =>
                  userType.value && option?.value === userType.value
                }
                renderOption={(option) => <div>{option.label}</div>}
                disableClearable={false}
                filterOptions={(x) => x}
              />
            </div>
          </div>
        </div>
        <div className={Styles.formContainer}>
          {signin ? (
            <SignInForm setSignin={setSignin} userType={userType} />
          ) : userType.value === "STUDENT" ? (
            <StudentSignUp setSignin={setSignin} />
          ) : (
            <TutorSignUp setSignin={setSignin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
