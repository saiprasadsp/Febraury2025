import { useState,useEffect } from "react";
import  "../styles/Login.css";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setLogin } from "../redux/authSlice";
import {  useLoginMutation} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
function Login() {
  const [userID,setUserID ] = useState("")
  const [password,setPassword ] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [login,{isLoading}]=useLoginMutation()

  useEffect(()=>{
    if (userInfo) {
      navigate('/layout')
    }
  },[])
  const handleLogin=async(e)=>{
    e.preventDefault()
    console.log(userID,password);
    
    try {
      const res = await login({userid:userID,password:password}).unwrap()
      console.log(res);
      
      dispatch(setLogin({...res}))
      navigate('/layout')
    } catch (err) {
      toast.error(err?.data?.message||err.error);
      
    }
  
  }
  return (
    <div className="vh-100 bg-primary">
      <div className="d-flex flex-row justify-content-between">
        <div className="col-md-8 bg-primary  border border-light">
        </div>
        <div className="col-md-4 bg-white  vh-100 rounded-start border border-black">
          <div className="d-flex flex-column align-items-center border border-warning ">
            
            <img
              src="blender_logo.png" // Replace with your logo path
              alt="Blender Logo"
              className="mb-3"
              style={{ width: '150px' }}
            />
            <h2 className="mb-3">Welcome</h2>
            <p className="text-center mb-4">Login your account to continue</p>
            <form className="w-100" onSubmit={handleLogin}>
              <div className="mb-3">
              <input type="text" placeholder="User ID" value={userID} onChange={(e) => setUserID(e.target.value)} required/>
              </div>
              <div className="mb-4">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span><a href="#" className="text-primary">Forgot Password?</a></span>
                <span className="justify-content-end"><button type="submit" className="btn btn-primary w-100">
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
    </div>




  );
}

export default Login;
