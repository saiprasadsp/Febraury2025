import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLogin, setLogout } from "../redux/authSlice";
import { useGetUserQuery } from "../slices/usersApiSlice"; // Add a profile API slice
import TermsConditions from "./TermsConditions";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const token = userInfo?.token;

const { data, error, isLoading } = useGetUserQuery(null, {
  skip: !token,   // only fetch if token exists
});

  // const { data, error, isLoading } = useGetUserQuery(null, {
  //   skip: !!userInfo,  // don't call if userInfo already exists
  // });

  useEffect(() => {

    if (data) {

      dispatch(setLogin(data)); // set user info from profile API
    } else if (error) {
      dispatch(setLogout());
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.termsAccepted) {
    return <TermsConditions/>
  }

  if (!allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
