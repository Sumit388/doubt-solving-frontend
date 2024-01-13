// * Packages Import * //
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// * Component Import * //
import CustomAutocomplete from "../Common/CustomAutocomplete";

// * Utils Import * //
import {
  allSubjects,
  sortByOptions,
  statusOptions,
  studentLanguages,
} from "../../data/homepageData";
import { getStudentDoubts } from "../../utils/urls";
import { getUserDetails, header } from "../../utils/cookieChecker";
import { toastSetting } from "../../utils/toastSettings";
import {
  commonErrorMessage,
  checkCookiesMessage,
} from "../../data/toastMessages";
import { formatDateTime } from "../../utils/utils";

// * Styles Import * //
import Styles from "../../styles/StudentDashboard.module.scss";

const DoubtHistory = ({ setActiveTab, setActiveDoubt }) => {
  const [subjects, setSubjects] = useState(allSubjects[0]);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(studentLanguages[0]);

  const userDetails = getUserDetails();

  const handleDoubtClick = (doubt) => {
    setActiveTab("Doubt Box");
    setActiveDoubt(doubt);
  };

  useEffect(() => {
    setLoading(true);

    if (!userDetails.userId) {
      toast.error(checkCookiesMessage, toastSetting);
      return;
    }

    axios
      .get(
        getStudentDoubts(
          userDetails?.userId,
          subjects?.value || "",
          status?.value || "",
          language?.value || "",
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
  }, [subjects, sortBy, status, language, userDetails?.userId]);

  return (
    <div className={Styles.historyContainer}>
      <h2>Your Doubt History</h2>
      <div className={Styles.filterContainer}>
        <div className={Styles.filter}>
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
            disableClearable={true}
            filterOptions={(x) => x}
          />
        </div>

        <div className={Styles.filter}>
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
            disableClearable={true}
            filterOptions={(x) => x}
          />
        </div>

        <div className={Styles.filter}>
          <CustomAutocomplete
            variant="inside"
            label="Status"
            placeholder="Doubts status"
            options={statusOptions}
            onChange={(option) => setStatus(option)}
            value={status}
            getOptionLabel={(option) => (option && option.label) || ""}
            isOptionEqualToValue={(option) =>
              status.value && option?.value === status.value
            }
            renderOption={(option) => <div>{option.label}</div>}
            disableClearable={true}
            filterOptions={(x) => x}
          />
        </div>

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
            disableClearable={true}
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
                      <TableCell align="right">
                        <b>Subject</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Tutor</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Status</b>
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
                          {row?.subject || ""}
                        </TableCell>
                        <TableCell align="right">
                          {row?.language || ""}
                        </TableCell>
                        <TableCell align="right">{row?.status || ""}</TableCell>
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

export default DoubtHistory;
