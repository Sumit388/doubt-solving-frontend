// * Packages Import * //
import { useState, useEffect } from "react";
import { sortByOptions } from "../../data/homepageData";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";

// * Component Import * //
import CustomAutocomplete from "../Common/CustomAutocomplete";

// * Utils Import * //
import { getUserDetails, header } from "../../utils/cookieChecker";
import { formatDateTime } from "../../utils/utils";
import { toastSetting } from "../../utils/toastSettings";
import {
  commonErrorMessage,
  checkCookiesMessage,
} from "../../data/toastMessages";
import { getTutorDoubts } from "../../utils/urls";

// * Styles Import * //
import Styles from "../../styles/StudentDashboard.module.scss";
import TutorStyles from "../../styles/TutorDashboard.module.scss";

const TutorDoubtHistory = ({ setActiveTab, setActiveDoubt }) => {
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [loading, setLoading] = useState(false);
  const [doubts, setDoubts] = useState([]);

  const handleDoubtClick = (doubt) => {
    setActiveTab("Doubt Box");
    setActiveDoubt(doubt);
  };

  const userDetails = getUserDetails();

  useEffect(() => {
    setLoading(true);

    if (!userDetails.userId) {
      toast.error(checkCookiesMessage, toastSetting);
      return;
    }

    axios
      .get(getTutorDoubts(userDetails.userId, "active", sortBy?.value), header())
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
  }, [sortBy, userDetails?.userId]);

  return (
    <div className={Styles.historyContainer}>
      <h2>Your Doubt History</h2>
      <div className={TutorStyles.tutorDetails}>
        <div className={TutorStyles.detailsEntry}>
          Name : <b>{userDetails?.name || "N/A"}</b>
        </div>
        <div className={TutorStyles.detailsEntry}>
          Class grade : <b>{userDetails?.grade || "N/A"}</b>
        </div>

        <div className={TutorStyles.detailsEntry}>
          Your Subject : <b>{userDetails?.subjects || "N/A"}</b>
        </div>
        <div className={TutorStyles.detailsEntry}>
          Your Language : <b>{userDetails?.language || "N/A"}</b>
        </div>
      </div>
      <div className={Styles.filterContainer}>
        <div className={Styles.filter}>
          <CustomAutocomplete
            variant="inside"
            label="Sort By"
            placeholder="Sort By."
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

      <div className={Styles.tableContainer}>
        <div>Click the doubt title to view chat history.</div>
        <TableContainer component={Paper}>
          {loading ? (
            "Loading your data please wait...."
          ) : (
            <>
              {doubts.length === 0 ? (
                "No data was fount. Please adjust the filter"
              ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Title</b>
                      </TableCell>
                      <TableCell>
                        <b>Student name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Created at</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doubts.map((row) => (
                      <TableRow
                        key={row.doubt_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <button
                            className={Styles.doubtButton}
                            onClick={() => handleDoubtClick(row)}
                          >
                            {row?.title || ""}
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          {row?.student_name || ""}
                        </TableCell>
                        <TableCell align="right">
                          {formatDateTime(row?.created_at) || ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

export default TutorDoubtHistory;
