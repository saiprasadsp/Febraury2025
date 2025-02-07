import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { Route, BrowserRouter , Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Dashboard from "./pages/Dashboard";
import Adminpage from "./pages/Adminpage";
import Userpage from "./pages/Userpage";
import Login from "./pages/login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";


const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
          <Route path="/admin" element={<ProtectedRoute element={<Adminpage/>} allowedRoles={["admin"]} />} />
          <Route path="/user" element={<ProtectedRoute element={<Userpage/>} allowedRoles={["user"]} />} />

        </Routes>
      </BrowserRouter>
      
    </Provider>
  );
}

export default App;
