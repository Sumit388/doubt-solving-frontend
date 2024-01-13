// * Packages Import * //
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// * Component Import * //
import CustomAutocomplete from "../Common/CustomAutocomplete";
import CustomInput from "../Common/CustomInput";

// * Utils Import * //
import { allSubjects } from "../../data/homepageData";
import { getUserDetails, header } from "../../utils/cookieChecker";
import { toastSetting } from "../../utils/toastSettings";
import {
  fillAllFiledsMessage,
  commonErrorMessage,
  checkCookiesMessage,
} from "../../data/toastMessages";
import { postOrGetDoubts } from "../../utils/urls";

// * Styles Import * //
import Styles from "../../styles/StudentDashboard.module.scss";

const RaiseDoubts = () => {
  const [subjects, setSubjects] = useState(null);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading]=useState(false);

  const userDetails = getUserDetails();

  const handleSubmit = () => {
    if (!subjects || !body || !title) {
      toast.error(fillAllFiledsMessage, toastSetting);
      return;
    }

    if (
      !userDetails.userId ||
      !userDetails.grade ||
      !userDetails.language ||
      !userDetails.name ||
      !userDetails.authToen
    ) {
      toast.error(checkCookiesMessage, toastSetting);
      return;
    }

    const requestBody = {
      student_id: userDetails.userId,
      subject: subjects.value,
      class_grade: userDetails.grade,
      language: userDetails.language,
      body: body,
      title: title,
      student_name: userDetails.name,
    };

    setLoading(true)

    axios
      .post(postOrGetDoubts, requestBody, header())
      .then((data) => {
        setLoading(false);
        toast.success(data?.data?.message || "Doubts Added.", toastSetting);
      })
      .catch((err) => {
        console.error(err?.message);
        setLoading(false);
        toast.error(
          err?.response?.data?.message || err?.message || commonErrorMessage,
          toastSetting
        );
      });
  };

  return (
    <div className={Styles.historyContainer}>
      <h2>Raise a new Doubt</h2>
      <div className={Styles.fieldContainer}>
        <CustomInput
          name="Title"
          label="Title"
          placeholder="What is this doubt about?"
          value={title}
          multiline={false}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          positionAdornment="end"
        />

        <CustomInput
          name="Description"
          label="Description"
          placeholder="Please Elaborate your doubt here."
          value={body}
          multiline={true}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          positionAdornment="end"
        />

        <div className={Styles.field}>
          <CustomAutocomplete
            variant="outside"
            label="Subject"
            placeholder="Subject"
            options={allSubjects}
            onChange={(option) => setSubjects(option)}
            value={subjects}
            getOptionLabel={(option) => (option && option.label) || ""}
            isOptionEqualToValue={(option) =>
              subjects.value && option?.value === subjects.value
            }
            renderOption={(option) => <div>{option.label}</div>}
            disableClearable={false}
            fieldOptions={(x) => x}
          />
        </div>

        <div className={Styles.field}>
          <CustomInput
            name="Student Name"
            label="Student Name"
            value={userDetails?.name || ""}
            multiline={false}
            positionAdornment="end"
            disabled
          />
        </div>

        <div className={Styles.field}>
          <CustomInput
            name="Language"
            label="Language"
            value={userDetails?.language || ""}
            multiline={false}
            positionAdornment="end"
            disabled
          />
        </div>

        <div className={Styles.field}>
          <CustomInput
            name="Class Grade"
            label="Class Grade"
            value={userDetails?.grade || ""}
            multiline={false}
            positionAdornment="end"
            disabled
          />
        </div>
        
        <div className={Styles.mandatory}>
          Title, Description & Subject are mandatory field.
        </div>
        <button className={Styles.submitButton} onClick={handleSubmit} disabled={loading}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default RaiseDoubts;
