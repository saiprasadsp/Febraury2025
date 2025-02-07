import { useState } from "react";
import  "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/authSlice";

function Login() {
  const [userID,setUserID ] = useState("")
  const [password,setPassword ] = useState("")
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:9000/',{
        userID,password
      })
      if (res.data) {
        dispatch(login(res.data))
      }
      console.log(res.data[0].Role,'step 1');
      
      if (res.data[0].Role === 'super admin') {
        console.log('step 2');
        
        navigate('/dashboard')
      } else {
        console.log('step 3');
        
        navigate('/dashboard')
      }
    } catch (error) {
      alert('Invallid Credentials')
    }
  }
  return (
    <div class="container">
        <div class="left-half">
        </div>
        <div class="right-half">
            <img src="blender_logo.png" alt="Blender Logo" class="logo" />
            <h2>Welcome</h2>
            <p>Login your account to continue</p>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="User ID" value={userID} onChange={(e) => setUserID(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div class="logincss">
                  <span>

                <a href="#" class="forgot-password">Forgot Password?</a>
                  </span>
                  <span>
                <button type="submit">Login</button>

                  </span>

                </div>
            </form>
            <p class="copyright">&copy; All rights received @2024 NagSoft India Pvt Ltd</p>
        </div>
    </div>

  );
}

export default Login;
