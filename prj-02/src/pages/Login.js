import { useState,useEffect } from "react";
import  "../styles/Login.css";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setLogin } from "../redux/authSlice";
import {  useLoginMutation} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import logo from "../assets/logo/TheQucikPayMe.png"
import "@fortawesome/fontawesome-free/css/all.min.css";
function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        
        try {
          const res = await login({ userid: userID, password: password,geoLocation:{latitude,longitude} }).unwrap();
    
          dispatch(setLogin({ ...res }));
          navigate("/dashboard");
        } catch (err) {
          setError("Please Enter Valid Credentials"); // Set error message
        }
      },(error)=>{console.error('Geolocation error:',error.message);
      })
    } else {
      console.log('Geo location is not supported by this browser');
      
    }
  };

  return (
    <div className="vh-100 d-flex">
      <div className="col-md-7 left-section"></div>
      <div className="col-md-5 right-section d-flex justify-content-center align-items-center">
        <div className="login-box">
          <div className="d-flex flex-column align-items-center">
            <img src={logo} alt="Blender Logo" className="logo-img" />
            <p className="text-center mb-3">Enter your login credentials to proceed</p>

            {error && <p className="error-text">{error}</p>} {/* Show error message */}

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
              <div className="mb-4 input-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>
                  <a href="#" className="text-primary">
                    Forgot Password?
                  </a>
                </span>
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>

            <p className="mt-4 text-center text-muted">&copy; All rights received @2025 NeoFin Nex India Pvt Ltd</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

