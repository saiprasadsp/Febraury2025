import React, { useEffect, useState } from 'react'
import FormContainer from "../Components/FormContainer";
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setLogin, setLogout } from '../redux/authSlice';

export default function Profile() {
  const[userId,setUserId] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const [updateUser,{isLoading}] = useUpdateUserMutation()
  const {userInfo} = useSelector((state)=>state.auth)

  useEffect(()=>{
    console.log('step 1',userInfo);
    
    if (userInfo && userInfo.id && userInfo.email) {      
      setUserId((prevId)=>prevId !== userInfo.id ? userInfo.id:prevId)
      setEmail((prevEmail)=>prevEmail !== userInfo.email ? userInfo.email:prevEmail)      
    }

  },[userInfo])
  
  const submitHandler=async (e)=>{
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match')
    } else {
      try {
        const res = await updateUser({email:email,password:password,userid:userId}).unwrap()
        dispatch(setLogout())
        toast.success('Porfile updated successfully')

      } catch (err) {
        console.log(err);
        
        toast.error(err?.data?.message||err.error)
      }
    }
  }
  return (
    <FormContainer >
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='userid'>
          <Form.Label>UserID</Form.Label>
          <Form.Control type='name' placeholder='Enter User Id' value={userId} onChange={(e)=>setUserId(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-2'>
        <Button type='submit' variant='primary' className='mt-3 wt-50' size='sm'>Update</Button>

        </Form.Group>
      </Form>
    </FormContainer>
  )
}
