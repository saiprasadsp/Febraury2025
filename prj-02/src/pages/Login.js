import { useState,useEffect } from "react";
import  "../styles/Login.css";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setLogin } from "../redux/authSlice";
import {  useLoginMutation} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import logo from "../assets/logo/TheQucikPayMe.png"
function Login() {
  const [userID,setUserID ] = useState("")
  const [password,setPassword ] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [login,{isLoading}]=useLoginMutation()

  useEffect(()=>{
    if (userInfo) {
      navigate('/dashboard')
    }
  },[])
  const handleLogin=async(e)=>{
    e.preventDefault()
    console.log(userID,password);
    
    try {
      const res = await login({userid:userID,password:password}).unwrap()
      console.log(res);
      
      dispatch(setLogin({...res}))
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.data?.message||err.error);
      
    }
  
  }
  return (
    <div className="vh-100 d-flex">
  <div className="col-md-8 left-section">
  </div>
  <div className="col-md-4 right-section">
    <div className="d-flex flex-column align-items-center">
      <img
        src={logo} // Replace with your logo path
        alt="Blender Logo"
      />
      <p className="text-center mb-8">Enter your login credentials to proceed</p>
      <form className="w-100" onSubmit={handleLogin}>
        <div className="mb-3">
        <i className="fas fa-user"></i>
          <input type="text" placeholder="User ID" value={userID} onChange={(e) => setUserID(e.target.value)} required/>
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span><a href="#" className="text-primary">Forgot Password?</a></span>
          <span className="justify-content-end"><button type="submit" className="btn btn-primary">
          Login
        </button>
        </span>            
        </div>
      </form>
      <p className="mt-4 text-center text-muted">
        &copy; All rights received @2024 NagSoft India Pvt Ltd
      </p>
    </div>
  </div>
</div>





  );
}

export default Login;
