import "./App.css";
import Login from "./pages/login-registration/Login";
import Registration from "./pages/login-registration/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EmailVerfication from "./pages/login-registration/EmailVerification";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/admin-verifcation" element={<EmailVerfication />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
