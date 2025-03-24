import { Outlet,Navigate,useLocation } from "react-router-dom";
import {useSelector,useDispatch  } from "react-redux";
import { useEffect } from "react";
import { setLogin,setLogout } from "../redux/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";

const ProtectedRoute=({children,allowedRoles})=>{
const {userInfo} = useSelector((state)=>state.auth);
const dispatch = useDispatch()
const location = useLocation()
const [login]=useLoginMutation()

const getCookie=(cookieName)=>{
    const cookies = document.cookie.split("; ")
    const cookie = cookies.find((row)=> row.startsWith(cookieName + "="))
    return cookie? cookie.split("=")[1]:null
}

useEffect(()=>{
    const token = getCookie('jwt')
    if (!token) {
        dispatch(setLogout())
        return
    }

    if (!userInfo) {
        const fetchUser = async()=>{
            try {
                const userData = await login().unwrap()
                
                dispatch(setLogin(userData))
            } catch (err) {
                dispatch(setLogout())
            }
        }
        fetchUser()
    }
    
},[userInfo,dispatch,login])
if (!userInfo ) {
    return <Navigate to='/' replace/>
}

if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to='/dashboard'  replace state={{from:location}}/>
}


return children?children:<Outlet/>
}

export default ProtectedRoute