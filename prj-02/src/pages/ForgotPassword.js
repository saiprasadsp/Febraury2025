import { useState, useEffect } from "react";
import "../styles/ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLogin } from "../redux/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import logo from "../assets/logo/TheQucikPayMe.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ForgotPassword() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [login] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await login({
            userid: userID,
            password,
            geoLocation: { latitude, longitude },
          }).unwrap();
          dispatch(setLogin({ ...res }));
          navigate("/dashboard");
        } catch (err) {
          setError("Please Enter Valid Credentials");
        }
      });
    } else {
      console.log("Geolocation not supported");
    }
  };

  return (
   
     <div class="col-12 min-vh-100 d-flex justify-content-center align-items-center right-section">
        <div className="login-box">
          <div className="d-flex flex-column align-items-center">
            <img src={logo} alt="Blender Logo" className="logo-img" />
            <p className="text-center mb-4">Enter your User ID. You will receive an OTP via email.</p>

            {error && <p className="error-text">{error}</p>}

            <form className="w-100" onSubmit={handleLogin}>
              <div className="mb-3 input-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="User ID"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                />
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span>
                  <a href="/login" className="text-primary">Back to Login?</a>
                </span>
                <button type="submit" className="btn btn-primary">Continue</button>
              </div>
            </form>

            <p className="mt-4 text-center text-muted">
              &copy; All rights reserved @2025 NeoFin Nex India Pvt Ltd
            </p>
          </div>
        </div>
      </div>
  );
}

export default ForgotPassword;
