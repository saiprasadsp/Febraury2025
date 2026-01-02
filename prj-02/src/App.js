import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Adminpage from "./pages/Adminpage";
import Userpage from "./pages/Userpage";
import SuperDistributor from "./pages/SuperDistributor";
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

import GetSuperDistributor from "./pages/SuperDistributor/GetSuperDistributor";
import SuperDistributorDetails from "./pages/SuperDistributor/SuperDistributorDetails";
import AddSuperDistributor from "./pages/SuperDistributor/AddSuperdistributor";
import SuperDistributorMargin from "./pages/SuperDistributor/SuperDistributorMargin";

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
import TransactionHistory from "./pages/TransactionHistory";
import Footer from "./pages/Webpages/WebPageFooter";
import HomePage from "./pages/Webpages/WebHomePage";
import BillPayments from "./pages/BillPayments";
import AboutUs from "./pages/Webpages/AboutUs";
import Features from "./pages/Webpages/Features";
import HowItWorks from "./pages/Webpages/HowItWorks";
import WSdashboard from "./pages/WholeSalerDashboard";
import TPIN from "./pages/TPIN";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/Email-otp";
import PasswordSetup from "./pages/PasswordSetup";
import Utilities from "./pages/Utilities";
import { ToastContainer } from "react-toastify";
import PaymentPage from "./pages/PaymentPage";


const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (<>
  <ToastContainer/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['distributor', "superadmin","retailer","wholesaler","reports","superdistributor"]}><Dashboard /></ProtectedRoute>}>
        <Route index={true} element={<ProtectedRoute allowedRoles={["distributor", "superadmin","superdistributor"]}><Content /></ProtectedRoute>} />

        <Route path="retail" element={<ProtectedRoute allowedRoles={["superadmin"]}><Retail /></ProtectedRoute>} />
        <Route path="transactions" element={<ProtectedRoute allowedRoles={["superadmin"]}><Transactions /></ProtectedRoute>} />
        <Route path="margin" element={<ProtectedRoute allowedRoles={["superadmin"]}><Margin /></ProtectedRoute>} />
        <Route path="approval" element={<ProtectedRoute allowedRoles={["superadmin"]}><KYCApproval /></ProtectedRoute>} />

        <Route path="superdistributor" element={<ProtectedRoute allowedRoles={["superdistributor", "superadmin"]}><SuperDistributor /></ProtectedRoute>}>
          <Route index={true} element={<GetSuperDistributor />} />
          <Route path="getSuperdistributor/:id" element={<SuperDistributorDetails />} />
          <Route path="addSuperdistributor" element={<AddSuperDistributor />} />
          <Route path="superDistributorMargin" element={<SuperDistributorMargin />} />
        </Route>
        <Route path="distributor" element={<ProtectedRoute allowedRoles={["distributor", "superadmin","superdistributor"]}><Distributor /></ProtectedRoute>}>
          <Route index={true} element={<GetDistributor />} />
          <Route path="getDistributor/:id" element={<DistributorDetails />} />
          <Route path="addDistributor" element={<AddDistributor />} />
          <Route path="distributorMargin" element={<DistributorMargin />} />
        </Route>

        <Route path="retailer" element={<ProtectedRoute allowedRoles={["distributor", "superadmin","superdistributor"]}><Retailer /></ProtectedRoute>}>
          <Route index={true} element={<GetRetailers />} />
          <Route path="getRetailer/:id" element={<RetailerDetails />} />
          <Route path="addRetailer" element={<ProtectedRoute allowedRoles={["distributor"]}><AddRetailer /></ProtectedRoute>}/>
          <Route path="retailerMargin" element={<RetailerMargin />} />
        </Route>
        <Route path="reports" element={<ProtectedRoute allowedRoles={['retailer','wholesaler']}><Reports/></ProtectedRoute>}>
        <Route index={true} element={<AddBalance/>}/>
        <Route path="banktransfer" element={<BankTransfer/>}/>
        <Route path="payments" element={<Payments/>}/>
        <Route path="passbook" element={<PassBook/>}/>
        <Route path="addnewbankaccount" element={<AddNewBankAccount/>}/>
        <Route path="addcreditcard" element={<AddCreditCard/>} />
        <Route path="comingsoon" element={<ComingSoon/>} />
        <Route path="TransactionHistory" element={<TransactionHistory/>} />
        </Route>

       <Route path="WSdashboard" element={<ProtectedRoute allowedRoles={["wholesaler"]}><WSdashboard /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute allowedRoles={["distributor", "superadmin","superdistributor"]}><Settings /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute allowedRoles={["distributor", "superadmin","retailer","wholesaler","superdistributor"]}><Profile /></ProtectedRoute>} />
        <Route path="register" element={<ProtectedRoute allowedRoles={["distributor", "superadmin","superdistributor"]}><Register /></ProtectedRoute>} />
        <Route path="addbalance" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><AddBalance/></ProtectedRoute>} />
        <Route path="banktransfer" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><BankTransfer/></ProtectedRoute>} />
        <Route path="addnewbankaccount" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><AddNewBankAccount/></ProtectedRoute>} />
        <Route path="payments" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><Payments/></ProtectedRoute>} />
        <Route path="addcreditcard" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><Payments/></ProtectedRoute>} />
        <Route path="comingsoon" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><Payments/></ProtectedRoute>} />
        <Route path="transactionhistory" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><Payments/></ProtectedRoute>} />
        <Route path="payment-status" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><PaymentStatus/></ProtectedRoute>} />
        <Route path="billpayments" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><BillPayments/></ProtectedRoute>} />
        <Route path="billpayments/category/:id" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><Utilities/></ProtectedRoute>} />
        <Route path="billpayments/:id" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><PaymentPage/></ProtectedRoute>} />
       <Route path="tpin" element={<ProtectedRoute allowedRoles={["retailer","wholesaler"]}><TPIN/></ProtectedRoute>} />

      </Route>
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["superadmin"]}><Adminpage /></ProtectedRoute>} />
      <Route path="/user" element={<ProtectedRoute allowedRoles={["distributor","superdistributor"]} ><Userpage /></ProtectedRoute>} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/refundpolicy" element={<RefundPolicy />} />
      <Route path="/contactus" element={<ContactUs/>} />
      <Route path="/aboutus" element={<AboutUs/>} />
      <Route path="/footer" element={<Footer/>} />
      <Route path="/features" element={<Features/>} />
      <Route path="/howitworks" element={<HowItWorks/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/emailotp/:id" element={<OTP/>} />
      <Route path="/passwordsetup/:id" element={<PasswordSetup/>} />



      {/* <Route path="/home" element={<HomePage/>} /> */}
f

    </Routes>
  </>


  );
}

export default App;
