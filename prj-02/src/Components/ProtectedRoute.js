import { Navigate } from "react-router";

import {useSelector  } from "react-redux";

const ProtectedRoute=({element,allowedRoles})=>{
const {user,isAuthenticated} = useSelector((state)=>state.auth);

if(!isAuthenticated) return <Navigate to='/login'/>
if (!allowedRoles.includes(user.Role)) return <Navigate to='/'/>

return element
}

export default ProtectedRoute