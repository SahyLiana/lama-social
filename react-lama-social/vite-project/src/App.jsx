import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

import Register from "./pages/register/Register";

import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  // Redirect,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* <Home /> */}
      {/* <Profile /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />

          <Route
            path="/messenger"
            element={!user ? <Navigate to="/" replace /> : <Messenger />}
          />

          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
