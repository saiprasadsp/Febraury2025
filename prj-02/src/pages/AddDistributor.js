import React, { useState } from "react";
import { Button, Steps, message, Upload, Image, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/AddDistributor.css";
import { toast } from "react-toastify";
import { useCreateDistributorMutation } from "../slices/usersApiSlice";
const { Option } = Select;

const steps = [
    { title: "Aadhaar Details" },
    { title: "PAN Details" },
    { title: "Business Details" },
    { title: "Bank Details" },
];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddDistributor = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [createDistributor,{isLoading}]=useCreateDistributorMutation()

    const [formData,setFormData] = useState({
        roleid:2,
        aadharName:'',
        aadharNumber:'',
        dob:'',
        gender:'',
        address:'',
        state:'',
        district:'',
        pincode:'',
        mobile:'',
        email:'',
        password:'',
        panNumber:'',
        panName:'',
        businessName:'',
        businessCategory:'',
        businessAddress:'',
        businessState:'',
        businessDistrict:'',
        businessPincode:'',
        businessLabourLicenseNumber:'',
        businessProprietorName:'',
        bankName:'',
        accountName:'',
        accountNumber:'',
        IFSC:'',
        doj:`${new Date().toISOString()}`,
        status:'Pending',
        // comments:'',
        ditributorMargin:'0.5',
        userType:'distributor',
        create:`${new Date().toISOString()}`,
        update:`${new Date().toISOString()}`

    })
    const [aadharUrl, setAadharUrl] = useState([]);
    const [panUrl,setPanUrl] = useState([])
    const [shopImageUrl,setShopImageUrl] = useState([])
    const [labourLicenseUrl,setLabourLicenseUrl] = useState([])
    const [cancelledCheckUrl,setCancelledCheckUrl] = useState([])

    const navigate = useNavigate();

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <AiOutlinePlus />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish = async(e) => {
        const data = new FormData()

        Object.entries(formData).forEach(([key,value])=>{
            data.append(key,value)
        })
        if(aadharUrl.length) data.append('aadharUrl',aadharUrl[0].originFileObj)
        if(panUrl.length) data.append('panUrl',panUrl[0].originFileObj)
        if(shopImageUrl.length) data.append('shopImageUrl',shopImageUrl[0].originFileObj)
        if(labourLicenseUrl.length) data.append('labourLicenseUrl',labourLicenseUrl[0].originFileObj)
        if(cancelledCheckUrl.length) data.append('cancelledCheckUrl',cancelledCheckUrl[0].originFileObj)

            console.log(data);

        try {
            const res = await createDistributor(data).unwrap()
            toast.success(res?.message)
            navigate('/dashboard/distributor')

        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message)
        }
            
    };
    const handleInputChange=(e)=>{
        
        setFormData({...formData,[e.target.name]:e.target.value})
        }

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h3>Add Distributor</h3>
            <Steps current={current} items={steps} />
            <Form form={form} layout="vertical" onFinish={onFinish}>
                {current === 0 && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Name as per Aadhaar" name="aadharName" rules={[{ required: true, message: "Please enter Aadhaar name" }]}>
                                    <Input value={formData.aadharName} onChange={handleInputChange} name="aadharName"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Aadhaar Number"
                                    name="aadharNumber"
                                    rules={[
                                        { required: true, message: "Please enter Aadhaar number" },
                                        { pattern: /^\d{4} \d{4} \d{4}$/, message: "Enter a valid 12-digit Aadhaar number (XXXX XXXX XXXX)" }
                                    ]}
                                >
                                    <Input
                                        maxLength={14}  // 12 digits + 2 spaces
                                        value={formData.aadharNumber}  name="aadharNumber"
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            value = value.slice(0, 12); // Limit to 12 digits
                                            value = value.replace(/(\d{4})/g, "$1 ").trim(); // Add space after every 4 digits
                                            setFormData({...formData,aadharNumber:value}) // Set formatted value in form
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter DOB" }]}>
                                    <DatePicker style={{ width: "100%" }} onChange={(date)=>setFormData({...formData,dob:new Date(date).toISOString()})} value={formData.dob} name="dob" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select gender" }]}>
                                    <Select value={formData.gender} onChange={(value)=>setFormData({...formData,gender:value})}>
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={16}>
                                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter Address" }]}>
                                    <Input value={formData.address} onChange={handleInputChange} name="address"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter state" }]}>
                                    <Input value={formData.state} onChange={handleInputChange} name="state"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="District" name="district" rules={[{ required: true, message: "Please enter district" }]}>
                                    <Input value={formData.district} onChange={handleInputChange} name="district"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: "Please enter pincode" }]}>
                                    <Input maxLength={6} value={formData.pincode} onChange={handleInputChange} name="pincode"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    rules={[
                                        { required: true, message: "Please enter mobile number" },
                                        { pattern: /^\d{10}$/, message: "Mobile number must be exactly 10 digits" }
                                    ]}
                                >
                                    <Input
                                        maxLength={10}
                                        value={formData.value}
                                        name="mobile"
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            setFormData({ ...formData,mobile: value }); // Set formatted value in form
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                    <Input value={formData.email} onChange={handleInputChange} name="email"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Upload Aadhaar" name="aadharUrl">
                                    <Upload
                                        listType="picture-card"
                                        fileList={aadharUrl}
                                        onPreview={handlePreview}
                                        onChange={({ fileList }) => setAadharUrl(fileList)}
                                    >
                                        {aadharUrl.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}

                {current === 1 && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="panName"
                                    label="Name as per PAN"
                                    rules={[{ required: true, message: "Please enter name as per PAN" }]}
                                >
                                    <Input value={formData.panName} onChange={handleInputChange} name="panName"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="panNumber"
                                    label="PAN Number"
                                    rules={[
                                        { required: true, message: "Please enter PAN number" },
                                        { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: "Enter a valid PAN (e.g., ABCDE1234F)" }
                                    ]}
                                >
                                    <Input maxLength={10} value={formData.panNumber} onChange={handleInputChange} name="panNumber"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                            <Upload
                                        listType="picture-card"
                                        fileList={panUrl}
                                        onPreview={handlePreview}
                                        onChange={({ fileList }) => setPanUrl(fileList)}
                                    >
                                        {panUrl.length >= 1 ? null : uploadButton}
                                    </Upload>
                            </Col>
                        </Row>

                    </>
                )}

                {current === 2 && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="businessName"
                                    label="Business Name"
                                    rules={[{ required: true, message: "Please enter Business Name" }]}
                                >
                                    <Input value={formData.businessName} onChange={handleInputChange} name="businessName"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="businessCategory"
                                    label="Business Category"
                                    rules={[{ required: true, message: "Please select Business Category" }]}
                                >
                                    <Input value={formData.businessCategory} onChange={handleInputChange} name="businessCategory"/>

                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="businessAddress"
                                    label="Business Address"
                                    rules={[{ required: true, message: "Please enter Business Address" }]}
                                >
                                    <Input value={formData.businessAddress} onChange={handleInputChange} name="businessAddress"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="businessState"
                                    label="State"
                                    rules={[{ required: true, message: "Please enter State" }]}
                                >
                                    <Input value={formData.businessState} onChange={handleInputChange} name="businessState"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="businessDistrict"
                                    label="District"
                                    rules={[{ required: true, message: "Please enter District" }]}
                                >
                                    <Input value={formData.businessDistrict} onChange={handleInputChange} name="businessDistrict"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="businessPincode"
                                    label="Pincode"
                                    rules={[
                                        { required: true, message: "Please enter Pincode" },
                                        { pattern: /^[0-9]{6}$/, message: "Enter a valid 6-digit Pincode" }
                                    ]}
                                >
                                    <Input maxLength={6} value={formData.businessPincode} onChange={handleInputChange} name="businessPincode"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="labourLicenseNumber"
                                    label="Labour License Number"
                                    rules={[{ required: true, message: "Please enter Labour License Number" }]}
                                >
                                    <Input value={formData.businessLabourLicenseNumber} onChange={handleInputChange} name="businessLabourLicenseNumber"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="proprietorName"
                                    label="Proprietor Name"
                                    rules={[{ required: true, message: "Please enter Proprietor Name" }]}
                                >
                                    <Input value={formData.businessProprietorName} onChange={handleInputChange} name="businessProprietorName"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="ShopPhoto"
                                    label="Shop Photo"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={shopImageUrl}
                                        onPreview={handlePreview}
                                        onChange={({ fileList }) => setShopImageUrl(fileList)}
                                    >
                                        {shopImageUrl.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="labourLicenseDocument"
                                    label="Labour License Document"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={labourLicenseUrl}
                                        onPreview={handlePreview}
                                        onChange={({ fileList }) => setLabourLicenseUrl(fileList)}
                                    >
                                        {labourLicenseUrl.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                    </>
                )}

                {current === 3 && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="bankName"
                                    label="Bank Name"
                                    rules={[{ required: true, message: "Please enter Bank Name" }]}
                                >
                                    <Input value={formData.bankName} onChange={handleInputChange} name="bankName"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="bankAccountHolder"
                                    label="Account Holder Name"
                                    rules={[{ required: true, message: "Please enter Account Holder Name" }]}
                                >
                                    <Input value={formData.accountName} onChange={handleInputChange} name="accountName"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="accountNumber"
                                    label="Account Number"
                                    rules={[
                                        { required: true, message: "Please enter Account Number" },
                                        { pattern: /^[0-9]{9,18}$/, message: "Enter a valid Account Number (9-18 digits)" }
                                    ]}
                                >
                                    <Input maxLength={18} value={formData.accountNumber} onChange={handleInputChange} name="accountNumber"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="ifscCode"
                                    label="IFSC Code"
                                    rules={[
                                        { required: true, message: "Please enter IFSC Code" },
                                        { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter a valid IFSC Code" }
                                    ]}
                                >
                                    <Input maxLength={11} value={formData.IFSC} onChange={handleInputChange} name="IFSC"/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="cancelledCheque"
                                    label="Cancelled Cheque / Passbook"
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={cancelledCheckUrl}
                                        onPreview={handlePreview}
                                        onChange={({ fileList }) => setCancelledCheckUrl(fileList)}
                                    >
                                        {cancelledCheckUrl.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                    </>
                )}

                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" className="next-button" onClick={next}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" className="done-button" htmlType="submit">
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button className="previous-button" onClick={prev}>
                            Previous
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default AddDistributor;
