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
} from "react-icons/ai";
import { FaSignOutAlt, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { setLogout } from "../redux/authSlice";
import navLinks from "../nav.json";
import logo from "../assets/logo/TheQucikPayMe.png";
import "../styles/Dashboard.css";

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowSidebar(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
    }
  };

  const handleMenuClick = (e) => {
    navigate(e.path);
    if (isMobile) setShowSidebar(false);
  };

  // Function to return correct icons based on key
  const getIcon = (key) => {
    switch (key) {
      case 1:
        return <AiOutlineDashboard />;
      case 2:
        return <AiOutlineTeam />;
      case 3:
        return <AiOutlineShop />;
      case 4:
        return <AiOutlineTransaction />;
      case 5:
        return <AiOutlineDollarCircle />;
      case 6:
        return <AiOutlineCheckCircle />;
      case 7:
        return <AiOutlineSetting />;
      case 8:
        return <FaUserPlus />; // Add Distributor
      case 9:
        return <FaUserCheck />; // KYC Distributor
      default:
        return null;
    }
  };

  // Convert JSON data into sidebar menu items
  const menuItems = navLinks.map((item) => {
    if (item.children) {
      return {
        key: item.path,
        label: item.label,
        icon: getIcon(item.key),
        children: item.children.map((subItem) => ({
          key: subItem.path,
          label: subItem.label,
          icon: getIcon(subItem.key),
          onClick: () => handleMenuClick(subItem),
        })),
      };
    } else {
      return {
        key: item.path,
        label: item.label,
        icon: getIcon(item.key),
        onClick: () => handleMenuClick(item),
      };
    }
  });

  return (
    <div className="dashboard-container">
      <ToastContainer />

      {/* Navbar */}
      <Header className="dashboard-header">
        <Button
          type="text"
          icon={isMobile ? <AiOutlineMenuUnfold /> : collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          onClick={() => (isMobile ? setShowSidebar(true) : setCollapsed(!collapsed))}
        />
        <div className="dashboard-navbar">
          <img src={logo} alt="QuickPay Logo" className="quickpay-logo" />
          <div className="btn-group">
            {userInfo && (
              <>
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
                  <li>
                    <Link to="profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link onClick={logoutHandler} className="dropdown-item">
                      Logout <FaSignOutAlt />
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </Header>

      {/* Sidebar Overlay for Mobile */}
      {isMobile && showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}></div>}

      {/* Main Layout */}
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
