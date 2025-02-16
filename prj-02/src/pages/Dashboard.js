import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Navbar ,Nav, NavDropdown, Container} from "react-bootstrap";
import { Outlet,Link, useNavigate } from 'react-router-dom'
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
  const {token:{colorBgContainer,borderRadiusLG}}=theme.useToken()
  const {userInfo} = useSelector(state=>state.auth)
  const[logout]=useLogoutMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler =async()=>{
    try {
      await logout().unwrap()
      dispatch(setLogout())
      navigate('/')
    } catch (err) {
      // toast.error(err?.data?.message||err.error);
      console.log(err);
      
      
    }
   }
   const hanldeMenuClick=(e)=>{
    console.log(e);
    
    
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

  return (
    <div style={{height:'100vh'}}>
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {navLinks.map((item)=>(
            <Menu.Item key={item.key} icon={getIcon(item.key)} onClick={()=>hanldeMenuClick(item)}>{item.label}</Menu.Item>
          ))}
        </Menu>
        </div>

      </Sider>
      <Layout>
        <Header style={{padding:0,background:colorBgContainer,display:'flex',alignItems: 'center' }}>
        <Button type='text' icon={collapsed?<AiOutlineMenuUnfold/>:<AiOutlineMenuFold/>} onClick={()=>setCollapsed(!collapsed)}/>
        <Navbar variant='pills' className='d-flex'>
          <Navbar.Brand>QuickPay</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' >
            <Nav className='ms-auto' >
              {userInfo&&(<>
              <NavDropdown   title={userInfo.id} >
                <NavDropdown.Item> <Link to='profile'>Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link onClick={logoutHandler}>Logout<FaSignOutAlt /></Link></NavDropdown.Item>
              </NavDropdown>
              </>)}

            </Nav>
          </Navbar.Collapse>
      </Navbar>
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
      {/* <Header/> */}
      {/* <ToastContainer/> */}
      {/* <Container> */}

      {/* </Container> */}
      {/* <Footer/> */}
    </div>
  )
}
