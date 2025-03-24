import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { clearSessionConflict,setLogout } from "../redux/authSlice";
import { Button, Modal } from 'antd';
export default function SessionConflictToast() {

    const dispatch = useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const sessionConflict = useSelector((state)=>state.auth.sessionConflict)

    useEffect(()=>{
      if (sessionConflict) {
        setIsModalVisible(true)
      }
    },[sessionConflict])

    const handleLogout=()=>{
        dispatch(setLogout())
        dispatch(clearSessionConflict)
        setIsModalVisible(false)
        window.location.href='/'
    }
    const handleIgnore=()=>{
      dispatch(clearSessionConflict())
      setIsModalVisible(false)
    }


  return (
    <div>
      <Modal
            title="Session Conflict"
            open={isModalVisible}
            onCancel={handleIgnore}
            footer={[
                <Button key="ignore" onClick={handleIgnore}>
                    Ignore
                </Button>,
                <Button key="logout" type="primary" danger onClick={handleLogout}>
                    Logout & Relogin
                </Button>
            ]}
        >
            <p>{sessionConflict}</p>
        </Modal>

    </div>

  )
}
