import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { setLogout } from "../redux/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { Navbar,Nav,Container,NavDropdown } from "react-bootstrap";
import { toast } from 'react-toastify';
export default function Header() {
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const {userInfo} = useSelector(state=>state.auth)

 const[logout]=useLogoutMutation()

 const logoutHandler =async()=>{
  try {
    await logout().unwrap()
    dispatch(setLogout())
    navigate('/')
  } catch (err) {
    toast.error(err?.data?.message||err.error);
    
  }
 }
  return (
  
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='bg-body-territory'>
        {/* <Container> */}
          <Navbar.Brand >MERN App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo&&(<>
              <NavDropdown title={userInfo.id}>
                <NavDropdown.Item> <Link to='profile'>Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link onClick={logoutHandler}>Logout<FaSignOutAlt /></Link></NavDropdown.Item>
              </NavDropdown>
              </>)}

            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>


  )
}
