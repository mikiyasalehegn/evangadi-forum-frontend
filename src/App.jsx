import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "./axios/axiosConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/LoginForm/LoginForm";
import RgisterForm from "./pages/RgisterForm/RgisterForm";
import AskQuestionPage from "./components/AskQestionPage/AskQuestionPage";
import AnswerPage from "./components/AnswerPage/AnswerPage";
import { EditProvider } from "./context/EditContext";

const AuthWrapper = ({ setAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function checkuser() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axiosInstance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data:", data);
      setUser(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) navigate("/login");
    }
  }

  useEffect(() => {
    checkuser();
  }, []);

  return null; // No UI needed here
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <EditProvider>
      <Router>
        <Header />
        {/* AuthWrapper handles token validation on page load */}
        <AuthWrapper setAuth={setIsAuthenticated} />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RgisterForm />} />
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AskQuestionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/answers/:question_id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AnswerPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </EditProvider>
  );
}

export default App;
