import { Outlet,Navigate,useLocation } from "react-router-dom";
import {useSelector  } from "react-redux";

const ProtectedRoute=({children,allowedRoles})=>{
const {userInfo} = useSelector((state)=>state.auth);
const location = useLocation()
console.log('step 3',userInfo);

if (!userInfo ) {
    return <Navigate to='/' replace/>
}

if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to='/dashboard'  replace state={{from:location}}/>
}


return children?children:<Outlet/>
}

export default ProtectedRoute