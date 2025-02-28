
import React, { useState } from 'react'
import FormContainer from '../Components/FormContainer'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Upload } from 'antd'
import { AiOutlinePlus } from "react-icons/ai";
import { useCreateDistributorMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
export default function AddDistributor() {
    const [formData,setFormData] = useState({
        id:2,
        roleId:2,
        firstName:'',
        lastName:'',
        mobile:'',
        email:'',
        password:'',
        aadharNumber:'',
        panNumber:'',
        userType:'distributor',
        status:'pending',
        comments:'Test' ,
        create:'2025-02-22 10:00:00',
        update:'2025-02-22 10:00:00'
    })

    const [aadharUrl,setAadharUrl] = useState([])
    const [panUrl,setPanUrl] = useState([])
    const [profileUrl,setProfileUrl] = useState([])
    const [signatureUrl,setSignatureUrl] = useState([])
    // const [fileList,setFileList] = useState({
    //     aadharUrl:[],
    //     panUrl:[],
    //     profileUrl:[],
    //     signatureUrl:[],

    // })

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state)=>state.auth)
    const [createDistributor,{isLoading}]=useCreateDistributorMutation()
    
    const submitHandler=async(e)=>{
        e.preventDefault();

        const data = new FormData();

        Object.entries(formData).forEach(([key,value])=>{
            data.append(key,value)
        })
        if(aadharUrl.length) data.append('aadharUrl',aadharUrl[0].originFileObj)
        if(panUrl.length) data.append('panUrl',panUrl[0].originFileObj)
        if(profileUrl.length) data.append('profileUrl',profileUrl[0].originFileObj)
        if(signatureUrl.length) data.append('signatureUrl',signatureUrl[0].originFileObj)

        console.log(data);
        
        try {
            const res = await createDistributor(data).unwrap()
            toast.success(res?.message)
            navigate('/dashboard/approval')
                
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message)
        }
    }
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
      };
    const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <AiOutlinePlus />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      );

    const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleFileChange=(field)=>({fileList})=>{
        setFileList((prev)=>({...prev,[field]:fileList}))
    }
  return (
    <Container fluid >
            <h1>Add Distributor</h1>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter First Name' name='firstName' value={formData.firstName} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Last Name' name='lastName' value={formData.lastName} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type='name' placeholder='Enter mobile number' name='mobile' value={formData.mobile} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='name' placeholder='Enter email' name='email' value={formData.email} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Aadhar Number</Form.Label>
                            <Form.Control type='name' placeholder='Aadhar Number' name='aadharNumber' value={formData.aadharNumber} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group></Col>
                    <Col>
                    <Upload
                       
                        listType="picture-card"
                        fileList={aadharUrl}
                        onPreview={handlePreview}
                        onChange={({fileList})=>setAadharUrl(fileList)}
                        name='aadharUrl'
                    >
                        {aadharUrl?.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                        />
                    )}

                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>PAN Number</Form.Label>
                            <Form.Control type='name' placeholder='PAN Number' name='panNumber' value={formData.panNumber} onChange={handleInputChange} required>
                            </Form.Control>
                        </Form.Group></Col>
                    <Col>
                    <Upload
                       
                        listType="picture-card"
                        fileList={panUrl}
                        onPreview={handlePreview}
                        onChange={({fileList})=>setPanUrl(fileList)}
                        name='panUrl'
                    >
                        {panUrl?.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                        />
                    )}

                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Profile Photo</Form.Label>
                            <Form.Control type='name' placeholder='Profile '  >
                            </Form.Control>
                        </Form.Group></Col>
                    <Col>
                    <Upload
                       
                        listType="picture-card"
                        fileList={profileUrl}
                        onPreview={handlePreview}
                        onChange={({fileList})=>setProfileUrl(fileList)}
                        name='profileUrl'
                    >
                        {profileUrl?.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                        />
                    )}

                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                        <Form.Group className='my-2' controlId='userid'>
                            <Form.Label>Signature</Form.Label>
                            <Form.Control type='name' placeholder='Signature' >
                            </Form.Control>
                        </Form.Group></Col>
                    <Col>
                    <Upload
                       
                        listType="picture-card"
                        fileList={signatureUrl}
                        onPreview={handlePreview}
                        onChange={({fileList})=>setSignatureUrl(fileList)}
                        name='signatureUrl'
                    >
                        {signatureUrl?.length >= 8 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                        />
                    )}

                    </Col>
                    
                </Row>
                <Row>
                    <Col>
                    <Button type='submit' variant='primary' className=' mt-3 wt-50' size='sm'>Cancel</Button>
                    </Col>
                    <Col>
                    <Button type='submit' variant='primary' className=' mt-3 wt-50' size='sm'>Save</Button>
                    </Col>

                </Row>
            </Form>

    </Container>
  )

