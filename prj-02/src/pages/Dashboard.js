import React, { useEffect, useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navbar ,Nav, NavDropdown, Container} from "react-bootstrap";
import { Outlet,Link, useNavigate, useLocation } from 'react-router-dom'
import { Layout,Menu,Button,theme } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold,AiOutlineUser,AiOutlineVideoCamera,AiOutlineUpload, AiOutlineSetting } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { setLogout } from '../redux/authSlice';
import navLinks from "../nav.json";
const {Header,Sider,Content,Footer}=Layout
export default function Dashboard() {
  const[collapsed,setCollapsed]=useState(false)
  const [filteredNav,setFilteredNav]=useState([])
  const {token:{colorBgContainer,borderRadiusLG}}=theme.useToken()
  const {userInfo} = useSelector(state=>state.auth)
  const[logout]=useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

useEffect(()=>{
  if (userInfo?.role) {
    const filteredLinks = navLinks.filter((item)=>item.roles.includes(userInfo?.role))
    setFilteredNav(filteredLinks)
  }
},[userInfo])
  const logoutHandler =async()=>{
    try {
      await logout().unwrap()
      dispatch(setLogout())
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message||err.error);
      console.log(err);
      
      
    }
   }
   const hanldeMenuClick=(e)=>{
    navigate(e.path)
   }
   const getIcon = (iconName) => {
    switch (iconName) {
      case 1: return <AiOutlineUser />;
      case 2: return <AiOutlineVideoCamera />;
      case 3: return <AiOutlineUpload />;
      case 4: return <AiOutlineUpload />;
      case 5: return <AiOutlineUpload />;
      case 6: return <AiOutlineUpload />;
      case 7: return <AiOutlineSetting />;
      default: return null; // Or a default icon
    }
  };
  const menuItems =filteredNav.map((item)=>({
    key:item.path,
    label:item.label,
    icon:getIcon(item.key),
    onClick:()=>hanldeMenuClick(item)

  }))
  return (
    <div style={{height:'100vh'}}>
      <ToastContainer/>
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname==="/dashboard"?"/dashboard":location.pathname]}

           items={menuItems} />
        
        </div>

      </Sider>
      <Layout>
        <Header style={{padding:0,background:colorBgContainer,display:'flex',alignItems: 'center' }} className='shadow-sm p-3 mb-5 bg-white rounded'>
        <Button type='text' icon={collapsed?<AiOutlineMenuUnfold/>:<AiOutlineMenuFold/>} onClick={()=>setCollapsed(!collapsed)}/>
        <div className='container-fluid  d-flex justify-content-between'>
          <div>QuickPay</div>
          <div className="btn-group">
            {userInfo&&(<>
              <button type="button" className="btn btn-secondary">{userInfo.id}</button>
              <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><Link to='profile' className='dropdown-item'>Profile</Link></li>
                <li><Link onClick={logoutHandler} className='dropdown-item'>Logout <FaSignOutAlt /></Link></li>
              </ul>

              </>)}
            </div>

        </div>
        </Header>
        <Content style={{background: colorBgContainer,
            borderRadius: borderRadiusLG}}>
          <Outlet/>
        </Content>
        <Footer style={{textAlign:'center'}}>
        All rights received @2024 NagSoft India Pvt Ltd
        </Footer>
      </Layout>
    </Layout>

    </div>
  )
}
