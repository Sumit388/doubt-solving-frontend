// * Packages Import * //
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// * Component Import * //
import CustomAutocomplete from "../Common/CustomAutocomplete";

// * Utils Import * //
import { sortByOptions } from "../../data/homepageData";
import { getUserDetails, header } from "../../utils/cookieChecker";
import {
  commonErrorMessage,
  checkCookiesMessage,
} from "../../data/toastMessages";
import { toastSetting } from "../../utils/toastSettings";
import { getAllPendingDoubts, addTutorToDoubts } from "../../utils/urls";
import { formatDateTime } from "../../utils/utils";

// * Styles Import * //
import Styles from "../../styles/StudentDashboard.module.scss";
import TutorStyles from "../../styles/TutorDashboard.module.scss";

function PendingDoubts({ setActiveTab, setActiveDoubt }) {
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(false);

  const userDetails = getUserDetails();

  const loginCheck =
    !userDetails.userId ||
    !userDetails?.subjects ||
    !userDetails?.grade ||
    !userDetails?.language;

  const handleAcceptDoubt = (doubt) => {
    if (loginCheck) {
      toast.error(checkCookiesMessage, toastSetting);
      return;
    }
    const body = { tutorId: userDetails?.userId, tutorName: userDetails?.name };
    axios
      .patch(addTutorToDoubts(doubt?.doubt_id), body, header())
      .then(() => {
        setActiveTab("Doubt Box");
        setActiveDoubt(doubt);
      }).catch((err) => {
        console.error(err?.message);
        toast.error(
          err?.response?.data?.message || err?.message || commonErrorMessage,
          toastSetting
        );
      });;
  };

  useEffect(() => {
    setLoading(true);

    if (loginCheck) {
      toast.error(checkCookiesMessage, toastSetting);
      return;
    }

    axios
      .get(
        getAllPendingDoubts(
          userDetails?.subjects || "",
          userDetails?.grade || "",
          userDetails?.language || "",
          sortBy?.value || "newest"
        ),
        header()
      )
      .then((data) => {
        setLoading(false);
        setDoubts(data?.data?.data);
      })
      .catch((err) => {
        console.error(err?.message);
        setLoading(false);
        toast.error(
          err?.response?.data?.message || err?.message || commonErrorMessage,
          toastSetting
        );
      });
  }, [sortBy]);

  return (
    <div className={Styles.historyContainer}>
      <h2>Please accept the doubts to connect with the students.</h2>
      <div className={Styles.filterContainer}>
        <div className={Styles.filter}>
          <CustomAutocomplete
            variant="inside"
            label="Student"
            placeholder="Select Student"
            options={sortByOptions}
            onChange={(option) => setSortBy(option)}
            value={sortBy}
            getOptionLabel={(option) => (option && option.label) || ""}
            isOptionEqualToValue={(option) =>
              sortBy.value && option?.value === sortBy.value
            }
            renderOption={(option) => <div>{option.label}</div>}
            disableClearable={false}
            filterOptions={(x) => x}
          />
        </div>
      </div>
      {loading ? (
        "Loading your data please wait...."
      ) : (
        <>
          {doubts.length === 0 ? (
            "No data was fount. Please adjust the filter"
          ) : (
            <div className={TutorStyles.doubtsContainer}>
              {doubts.map((row) => (
                <div className={TutorStyles.doubts} key={row?.doubt_id}>
                  <h3>{row?.title}</h3>
                  <p>
                    <i>
                      Asked by: {row?.student_name} ({" "}
                      {formatDateTime(row?.created_at) || ""})
                    </i>
                  </p>
                  <p>{row?.body}</p>
                  <button
                    className={TutorStyles.acceptButton}
                    onClick={() => handleAcceptDoubt(row)}
                  >
                    Accept
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PendingDoubts;
