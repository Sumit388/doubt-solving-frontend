// * Packages Import * //
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * Pages Import * //
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";

// * Utils Import * //
import { getUserDetails } from "./utils/cookieChecker";

// * Styles Import * //
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const user = getUserDetails();

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/students/dashboard"
            element={
              user.userRole === "STUDENT" ? (
                <StudentDashboard />
              ) : (
                <h3>Please Log in to continue.</h3>
              )
            }
          />
          <Route
            path="/tutors/dashboard"
            element={
              user.userRole === "TUTOR" ? (
                <TutorDashboard />
              ) : (
                <h3>Please Log in to continue.</h3>
              )
            }
          />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
