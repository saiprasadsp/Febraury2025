import React from 'react'
import { Modal,Button } from "antd";
import { useDispatch,useSelector } from "react-redux";
import { useAccepTermsMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { setLogin, setLogout } from "../redux/authSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function TermsConditions() {
    const {userInfo} = useSelector(state=>state.auth)

    const dispatch = useDispatch()
    const [accepTerms] = useAccepTermsMutation()
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const handleAccept =async()=>{
        await accepTerms()
        dispatch(setLogin({...userInfo,termsAccepted:true}))
    }
    const handleDecline=async () => {
      try {
            await logout().unwrap();
            dispatch(setLogout());
            navigate("/");
          } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.log(err);
          }
    }
  return (
    <Modal open={!userInfo.termsAccepted} footer={null} closable={false}>
        <h2>Terms and Conditions</h2>
        <p>.......</p>
        <Button type='primary' onClick={handleAccept}>Accept</Button>
        <Button type='primary' onClick={handleDecline}>Decline</Button>
    </Modal>
  )
}
