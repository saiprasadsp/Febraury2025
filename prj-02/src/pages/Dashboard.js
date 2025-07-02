import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineDashboard,
  AiOutlineTeam,
  AiOutlineShop,
  AiOutlineTransaction,
  AiOutlineDollarCircle,
  AiOutlineCheckCircle,
  AiOutlineSetting,
  AiOutlineBook,
  AiOutlineFileText,
} from "react-icons/ai";
import {
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaSignOutAlt,
  FaUserPlus,
  FaUserCheck,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { setLogout } from "../redux/authSlice";
import SessionConflictToast from "../Components/SessionConflictToast";
import navLinks from "../nav.json";
import logo from "../assets/logo/TheQucikPayMe.png";
import "../styles/Dashboard.css";
import RetailerDashboard from "./RetailerDashboard";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [filteredNav, setFilteredNav] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userInfo?.role) {
      const filteredLinks = navLinks
        .filter((link) => link.roles?.includes(userInfo.role))
        .map((link) => {
          const children = link.children?.filter(
            (child) =>
              !(userInfo.role === "superadmin" &&
              child.path === "/dashboard/retailer/addretailer")
          );
          return { ...link, children };
        })
        .filter((link) => !link.children || link.children.length > 0);
      setFilteredNav(filteredLinks);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userInfo]);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleMenuClick = (e) => {
    navigate(e.path);
    if (isMobile) setShowSidebar(false);
  };

  const getIcon = (key) => {
    const icons = {
      1: <AiOutlineDashboard />, 2: <AiOutlineTeam />, 3: <AiOutlineShop />,
      4: <AiOutlineTransaction />, 5: <AiOutlineDollarCircle />,
      6: <AiOutlineCheckCircle />, 7: <AiOutlineSetting />, 8: <FaWallet />,
      9: <FaUserCheck />, 10: <FaCreditCard />, 11: <FaUniversity />,
      12: <AiOutlineBook />, 13: <AiOutlineFileText />, 14: <FaUserPlus />,
    };
    return icons[key] || null;
  };

  const menuItems = filteredNav.map((item) => {
    const children = item.children?.map((subItem) => ({
      key: subItem.path,
      label: subItem.label,
      icon: getIcon(subItem.key),
      onClick: () => handleMenuClick(subItem),
    }));
    return {
      key: item.path,
      label: item.label,
      icon: getIcon(item.key),
      children,
      onClick: () => !children && handleMenuClick(item),
    };
  });

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <Header className="dashboard-header">
        <Button
          type="text"
          icon={collapsed || isMobile ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          onClick={() => (isMobile ? setShowSidebar(true) : setCollapsed(!collapsed))}
        />
        <div className="dashboard-navbar">
          <img src={logo} alt="QuickPay Logo" className="quickpay-logo" />
          {userInfo && (
            <div className="btn-group">
              <button type="button" className="btn btn-secondary">
                {userInfo.id}
              </button>
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><Link to="profile" className="dropdown-item">Profile</Link></li>
                <li><Link onClick={logoutHandler} className="dropdown-item">Logout <FaSignOutAlt /></Link></li>
              </ul>
            </div>
          )}
        </div>
      </Header>

      {isMobile && showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />}

      <Layout className="dashboard-layout">
        <Sider
          className={`dashboard-sider ${isMobile ? (showSidebar ? "mobile-sidebar show" : "mobile-sidebar") : ""}`}
          collapsible
          collapsed={collapsed && !isMobile}
          trigger={null}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname === "/dashboard" ? "/dashboard" : location.pathname]}
            items={menuItems}
          />
        </Sider>

        <Layout>
          <Content className="dashboard-content">
            <SessionConflictToast />
            {userInfo?.role === "retailer" && location.pathname === "/dashboard" ? (
              <RetailerDashboard />
            ) : (
              <Outlet />
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
