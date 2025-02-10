import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
      <Header/>
      <ToastContainer/>
      {/* <Container> */}
        <Outlet/>

      {/* </Container> */}
      <Footer/>
    </>
  )
}
