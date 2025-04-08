import React, { useEffect, useRef, useState } from 'react';
import { Button, Steps, message, Upload, Image, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useGetRetailerMutation } from '../slices/usersApiSlice';
import PdfUploader from "./PdfUploader"; // ✅ Import PdfUploader
import "../styles/ApproveDistributor.css";
import dayjs from "dayjs";

const { Option } = Select;

const steps = [
    { title: "Aadhaar Details" },
    { title: "PAN Details" },
    { title: "Business Details" },
    { title: "Bank Details" },
];

export default function RetailerDetails() {
    const formUpdated = useRef(false);
    const [current, setCurrent] = useState(0);
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    const [aadharFile, setAadharFile] = useState([]);
    const [panFile, setPanFile] = useState([]);
    const [shopImageFile, setShopImageFile] = useState([]);
    const [labourLicenseFile, setLabourLicenseFile] = useState([]);
    const [cancelledCheckFile, setCancelledCheckFile] = useState([]);
    const [formData, setFormData] = useState({
        ID: "",
        roleid: 3,
        aadharName: '',
        aadharNumber: '',
        dob: '',
        gender: '',
        address: '',
        state: '',
        district: '',
        pincode: '',
        mobile: '',
        email: '',
        password: '',
        panNumber: '',
        panName: '',
        businessName: '',
        businessCategory: '',
        businessAddress: '',
        businessState: '',
        businessDistrict: '',
        businessPincode: '',
        businessLabourLicenseNumber: '',
        businessProprietorName: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        IFSC: '',
        doj: `${new Date().toISOString()}`,
        status: 'Pending',
        retailerPercentage: process.env.REACT_APP_Retailer_Percentage,
        userType: 'retailer',
        create: `${new Date().toISOString()}`,
        update: `${new Date().toISOString()}`
    });
    const [getRetailerDetails, { isLoading }] = useGetRetailerMutation();
    const [dob, setDob] = useState("");
    
    useEffect(() => {
        async function getRetailerDetail() {
            try {
                const res = await getRetailerDetails({ retailerId: id }).unwrap();
                console.log("Retailer Details:", res);
                setData(res);
                if (res.length > 0) {
                    const item = res[0];
                    setFormData((prevData) => ({
                        ...prevData,
                        ID: item.ID,
                        aadharName: item.name_as_per_aadhaar,
                        aadharNumber: item.aadhar_number,
                        dob: new Date(item.dob).toISOString(),    
                        gender: item.gender,
                        address: item.address,
                        state: item.state,
                        district: item.district,
                        pincode: item.pincode,
                        mobile: item.user_mobile,
                        email: item.user_email,
                        aadharUrl: item.aadhar_url,
                        kycstatus: item.kyc_status,    
                        panName: item.name_as_per_pan,
                        panNumber: item.pan_number,
                        panUrl: item.pan_url,
                        businessName: item.bank_name,
                        businessCategory: item.business_category,
                        businessAddress: item.business_address,
                        businessState: item.business_state,
                        businessDistrict: item.business_district,
                        businessPincode: item.business_pincode,
                        businessLabourLicenseNumber: item.business_labour_license_Number,
                        businessProprietorName: item.business_proprietor_Name,
                        ShopPhoto: item.shop_photo_url,
                        labourLicenseDocument: item.business_ll_url,    
                        bankName: item.bank_name,
                        accountName: item.account_holder_name,
                        accountNumber: item.account_number,
                        IFSC: item.ifsc_code,
                        cancelledCheque: item.cancelled_check_url,        
                    }));
                    
                    if (!formUpdated.current) {
                        form.setFieldsValue({
                            ...formData, dob: item.dob ? dayjs(item.dob) : null
                        });
                        formUpdated.current = true;
                    }
                    console.log("step 10", formData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRetailerDetail();
    }, []);

    useEffect(() => {
        form.setFieldsValue(formData);
    }, [formData]);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const onFinish = async () => {};
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("step 3", name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };




    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h4>View Retailer</h4>
            <Steps current={current} items={steps} />
            {data.map((item) => (<>
                <Form form={form} layout="vertical">

                    {current === 0 && (
                        <>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Name as per Aadhaar"
                                        name="aadharName"
                                        rules={[{ required: true, message: "Please enter Aadhaar name" }]}
                                    >
                                        <Input
                                            value={formData.aadharName}
                                            onChange={handleInputChange}
                                            name="aadharName"
                                        />
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
                                            maxLength={14} // 12 digits + 2 spaces
                                            value={form.getFieldValue("aadharNumber")}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, ""); // ✅ Remove non-numeric characters
                                                value = value.substring(0, 12); // ✅ Limit to 12 digits

                                                // ✅ Automatically insert space after every 4 digits
                                                let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

                                                form.setFieldsValue({ aadharNumber: formattedValue }); // ✅ Update Ant Design form state
                                            }}
                                            name="aadharNumber"
                                            inputMode="numeric" // ✅ Show numeric keyboard on mobile
                                            onKeyDown={(e) => {
                                                if (!/[0-9\s]/.test(e.key) && e.key !== "Backspace") {
                                                    e.preventDefault(); // ✅ Block non-numeric and non-space input
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter DOB" }]}>
                                        {/* <DatePicker initialValues={dayjs(formData.dob)} style={{ width: "100%" }} onChange={(date) => setFormData({ ...formData, dob: new Date(date).toISOString() })} value={formData.dob} name="dob" /> */}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select gender" }]}>
                                        <Select value={formData.gender} onChange={(value) => setFormData({ ...formData, gender: value })}>
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
                                        <Input value={formData.address} onChange={handleInputChange} name="address" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter state" }]}>
                                        <Input value={formData.state} onChange={handleInputChange} name="state" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="District" name="district" rules={[{ required: true, message: "Please enter district" }]}>
                                        <Input value={formData.district} onChange={handleInputChange} name="district" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Pincode" name="pincode">
                                        <Input maxLength={6} value={formData.pincode} onChange={handleInputChange} name="pincode" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Mobile Number"
                                        name="mobile"
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
                                                setFormData({ ...formData, mobile: value }); // Set formatted value in form
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                        <Input
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            name="email"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="aadharUrl">
                                        <PdfUploader
                                            label="Aadhaar"
                                            fileList={aadharFile}
                                            setFileList={setAadharFile}
                                            initialFiles={[aadharFile]} // Replace with actual URL(s)
                                        />
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
                                        <Input value={formData.panName} onChange={handleInputChange} name="panName" />
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
                                        normalize={(value) => value.toUpperCase()} // Automatically converts input to uppercase
                                    >
                                        <Input maxLength={10} name='panNumber' value={formData.panNumber} onChange={handleInputChange}/>
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item >
                                        <PdfUploader label="PAN Card" fileList={panFile} setFileList={setPanFile} initialFiles={[panFile]}/>
                                    </Form.Item>
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
                                        <Input value={formData.businessName} onChange={handleInputChange} name="businessName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessCategory"
                                        label="Business Category"
                                        rules={[{ required: true, message: "Please select Business Category" }]}
                                    >
                                        <Input value={formData.businessCategory} onChange={handleInputChange} name="businessCategory" />

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
                                        <Input value={formData.businessAddress} onChange={handleInputChange} name="businessAddress" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessState"
                                        label="State"
                                        rules={[{ required: true, message: "Please enter State" }]}
                                    >
                                        <Input value={formData.businessState} onChange={handleInputChange} name="businessState" />
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
                                        <Input value={formData.businessDistrict} onChange={handleInputChange} name="businessDistrict" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessPincode"
                                        label="Pincode"
                                        rules={[
                                            { pattern: /^[0-9]{6}$/, message: "Enter a valid 6-digit Pincode" }
                                        ]}
                                    >
                                        <Input maxLength={6} value={formData.businessPincode} onChange={handleInputChange} name="businessPincode" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessLabourLicenseNumber"
                                        label="Labour License Number"
                                    >
                                        <Input value={formData.businessLabourLicenseNumber} onChange={handleInputChange} name="businessLabourLicenseNumber" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessProprietorName"
                                        label="Proprietor Name"
                                        rules={[{ required: true, message: "Please enter Proprietor Name" }]}
                                    >
                                        <Input value={formData.businessProprietorName} onChange={handleInputChange} name="businessProprietorName" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="shopImageUrl">
                                        <PdfUploader label="Shop Image" fileList={shopImageFile} setFileList={setShopImageFile} initialFiles={[shopImageFile]}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="labourLicenseUrl">
                                        <PdfUploader label="Labour License" fileList={labourLicenseFile} setFileList={setLabourLicenseFile} initialFiles={[labourLicenseFile]}/>
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
                                        <Input value={formData.bankName} onChange={handleInputChange} name="bankName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="accountName"
                                        label="Account Holder Name"
                                        rules={[{ required: true, message: "Please enter Account Holder Name" }]}
                                    >
                                        <Input value={formData.accountName} onChange={handleInputChange} name="accountName" />
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
                                        <Input maxLength={18} value={formData.accountNumber} onChange={handleInputChange} name="accountNumber" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="IFSC"
                                        label="IFSC Code"
                                        rules={[
                                            { required: true, message: "Please enter IFSC Code" },
                                            { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter a valid IFSC Code (e.g., ABCD0123456)" }
                                        ]}
                                        normalize={(value) => value.toUpperCase()} // Automatically converts input to uppercase
                                    >
                                        <Input maxLength={11} value={formData.IFSC}  onChange={handleInputChange} name='IFSC'/>
                                    </Form.Item>

                                </Col>

                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="cancelledCheckUrl">
                                        <PdfUploader label="Cancelled Check" fileList={cancelledCheckFile} setFileList={setCancelledCheckFile} initialFiles={[cancelledCheckFile]}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}

                    <div style={{ marginTop: 24 }}>

                        {item && (
                            <>
                                {current < steps.length - 1 && (
                                    <Button type="primary" className="next-button" onClick={next}>
                                        Next
                                    </Button>
                                )}

                                {["Pending", "Rejected"].includes(item.kyc_status) && current === steps.length - 1 && (
                                    <>
                                        <Button type="primary" className="done-button" htmlType="submit" >
                                            Update
                                        </Button>
                                        <Button type="primary" className="approve-button" htmlType="submit">
                                            Approve
                                        </Button>
                                        <Button type="primary" className="reject-button" htmlType="submit">
                                            Reject
                                        </Button>
                                    </>
                                )}

                                {item.kyc_status === "Approved" && current === steps.length - 1 && (
                                    <Button type="primary" className="done-button">
                                        Close
                                    </Button>
                                )}

                                {current > 0 && (
                                    <Button className="previous-button" onClick={prev}>
                                        Previous
                                    </Button>
                                )}
                            </>
                        )}
                    </div>



                </Form>
            </>))}

        </div>
    );
}
