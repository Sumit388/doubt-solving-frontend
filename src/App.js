// * Packages Import * //
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        <Switch>
          <Route path="/students/dashboard">
            {user.userRole === "STUDENT" ? (
              <StudentDashboard />
            ) : (
              <h3>Please Log in to continue.</h3>
            )}
          </Route>
          <Route path="/tutors/dashboard">
            {user.userRole === "TUTOR" ? (
              <TutorDashboard />
            ) : (
              <h3>Please Log in to continue.</h3>
            )}
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
