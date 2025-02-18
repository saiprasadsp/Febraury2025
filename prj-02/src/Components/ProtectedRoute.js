import { Navigate } from "react-router";
import { Outlet } from "react-router-dom";
import {useSelector  } from "react-redux";

const ProtectedRoute=({children,allowedRoles})=>{
const {userInfo} = useSelector((state)=>state.auth);
console.log('step 3',userInfo);

if (!userInfo || !userInfo.role|| !allowedRoles.includes(userInfo.role)) {
    return <Navigate to='/' replace/>
}


return children
}

export default ProtectedRoute