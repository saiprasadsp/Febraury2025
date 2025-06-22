import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Adminpage from "./pages/Adminpage";
import Userpage from "./pages/Userpage";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Retail from "./pages/RetailList";
import Transactions from "./pages/Transactions";
import Margin from "./pages/Margin";
import KYCApproval from "./pages/KYCApproval";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Content from "./pages/Content";
import GetDistributor from "./pages/Distributor/GetDistributor";
import DistributorDetails from "./pages/Distributor/DistributorDetails";
import AddDistributor from "./pages/Distributor/AddDistributor";
import DistributorMargin from "./pages/Distributor/DistributorMargin";

import GetRetailers from "./pages/Retailer/GetRetailer";
import RetailerDetails from './pages/Retailer/RetailerDetails'
import AddRetailer from "./pages/Retailer/AddRetailer";
import RetailerMargin from './pages/Retailer/RetailerMargin'
import AddBalance from "./pages/AddBalance";
import BankTransfer from "./pages/BankTransfer";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import PassBook from "./pages/PassBook";
import AddNewBankAccount from './pages/AddNewBankAccount';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import PaymentStatus from "./pages/PaymentStatus";
import ContactUs from "./pages/Webpages/ContactUs";
import AddCreditCard from "./pages/AddCreditCard";
import ComingSoon from "./pages/ComingSoon";




const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['distributor', "superadmin","retailer"]}><Dashboard /></ProtectedRoute>}>
        <Route index={true} element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Content /></ProtectedRoute>} />

        <Route path="retail" element={<ProtectedRoute allowedRoles={["superadmin"]}><Retail /></ProtectedRoute>} />
        <Route path="transactions" element={<ProtectedRoute allowedRoles={["superadmin"]}><Transactions /></ProtectedRoute>} />
        <Route path="margin" element={<ProtectedRoute allowedRoles={["superadmin"]}><Margin /></ProtectedRoute>} />
        <Route path="approval" element={<ProtectedRoute allowedRoles={["superadmin"]}><KYCApproval /></ProtectedRoute>} />

        <Route path="distributor" element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Distributor /></ProtectedRoute>}>
          <Route index={true} element={<GetDistributor />} />
          <Route path="getDistributor/:id" element={<DistributorDetails />} />
          <Route path="addDistributor" element={<AddDistributor />} />
          <Route path="distributorMargin" element={<DistributorMargin />} />
        </Route>

        <Route path="retailer" element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Retailer /></ProtectedRoute>}>
          <Route index={true} element={<GetRetailers />} />
          <Route path="getRetailer/:id" element={<RetailerDetails />} />
          <Route path="addRetailer" element={<ProtectedRoute allowedRoles={["distributor"]}><AddRetailer /></ProtectedRoute>}/>
          <Route path="retailerMargin" element={<RetailerMargin />} />
        </Route>
        <Route path="reports" element={<ProtectedRoute allowedRoles={['retailer']}><Reports/></ProtectedRoute>}>
        <Route index={true} element={<AddBalance/>}/>
        <Route path="banktransfer" element={<BankTransfer/>}/>
        <Route path="payments" element={<Payments/>}/>
        <Route path="passbook" element={<PassBook/>}/>
        <Route path="addnewbankaccount" element={<AddNewBankAccount/>}/>
        <Route path="addcreditcard" element={<AddCreditCard/>} />
        <Route path="comingsoon" element={<ComingSoon/>} />
        
        </Route>


        <Route path="settings" element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Settings /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Profile /></ProtectedRoute>} />
        <Route path="register" element={<ProtectedRoute allowedRoles={["distributor", "superadmin"]}><Register /></ProtectedRoute>} />
        <Route path="addbalance" element={<ProtectedRoute allowedRoles={["retailer"]}><AddBalance/></ProtectedRoute>} />
        <Route path="banktransfer" element={<ProtectedRoute allowedRoles={["retailer"]}><BankTransfer/></ProtectedRoute>} />
        <Route path="addnewbankaccount" element={<ProtectedRoute allowedRoles={["retailer"]}><AddNewBankAccount/></ProtectedRoute>} />
        <Route path="payments" element={<ProtectedRoute allowedRoles={["retailer"]}><Payments/></ProtectedRoute>} />
        <Route path="addcreditcard" element={<ProtectedRoute allowedRoles={["retailer"]}><Payments/></ProtectedRoute>} />
        <Route path="comingsoon" element={<ProtectedRoute allowedRoles={["retailer"]}><Payments/></ProtectedRoute>} />
        <Route path="payment-status" element={<ProtectedRoute allowedRoles={["retailer"]}><PaymentStatus/></ProtectedRoute>} />
      </Route>
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["superadmin"]}><Adminpage /></ProtectedRoute>} />
      <Route path="/user" element={<ProtectedRoute allowedRoles={["distributor"]} ><Userpage /></ProtectedRoute>} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/refundpolicy" element={<RefundPolicy />} />
      <Route path="/contactus" element={<ContactUs/>} />
     

    </Routes>

  );
}

export default App;
