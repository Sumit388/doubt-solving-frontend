// * Packages Import * //
import { useState } from "react";

// * Component Import * //
import CustomInput from "../Common/CustomInput";

// * Styles Import * //
import Styles from "../../styles/StudentDashboard.module.scss";

const DoubtBox = ({ activeDoubt }) => {
  const [message, setMessage] = useState("");
  
  return (
    <div className={Styles.historyContainer}>
      <h2>
        <b>Title:</b>
        {activeDoubt?.title}
      </h2>
      <div className={Styles.chatContainer}>
        <div className={Styles.chatBox}>
          <p>
            <b>Description:</b>
            {activeDoubt?.body}
          </p>
          <p>*Active doubt chatbox functionality coming very soon.*</p>
        </div>
        <div className={Styles.inputField}>
          <CustomInput
            name="Message"
            label="Please Enter your message here."
            placeholder=""
            value={message}
            multiline={true}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            positionAdornment="end"
          />
          <button>send</button>
        </div>
      </div>
    </div>
  );
};

export default DoubtBox;
