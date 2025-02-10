import { Provider, useSelector } from "react-redux";
import  store  from "./redux/store";
import { Route, BrowserRouter , Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Adminpage from "./pages/Adminpage";
import Userpage from "./pages/Userpage";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./pages/Profile";
import Register from "./pages/Register";
const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return ( 
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/layout" element={<ProtectedRoute allowedRoles={['user', 1]}><Layout /></ProtectedRoute>}>
            <Route path="profile" element={<ProtectedRoute allowedRoles={["user",1]}><Profile/></ProtectedRoute>}/>
            <Route path="register" element={<ProtectedRoute allowedRoles={["user",1]}><Register/></ProtectedRoute>}/>

          </Route>
          <Route path="/admin" element={<ProtectedRoute  allowedRoles={["admin"]}><Adminpage/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute  allowedRoles={["user"]} ><Userpage/></ProtectedRoute>} />

        </Routes>
      
  );
}

export default App;
