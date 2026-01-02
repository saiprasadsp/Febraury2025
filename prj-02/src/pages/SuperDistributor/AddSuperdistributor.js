import React, { useState } from "react";
import { Button, Steps, message, Form, Input, Select, DatePicker, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/AddDistributor.css";
import { toast } from "react-toastify";
import { useCreateSuperDistributorMutation } from "../../slices/usersApiSlice";
import PdfUploader from "../../Components/PdfUploader"; // ✅ Import PdfUploader
import Spinner from "../../Components/Spinner";

const { Option } = Select;

const steps = [
    { title: "Aadhaar Details" },
    { title: "PAN Details" },
    { title: "Business Details" },
    { title: "Bank Details" },
];


const AddSuperdistributor = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [createSuperDistributor, { isLoading }] = useCreateSuperDistributorMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roleid: 4,
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
        superditributorMargin: process.env.REACT_APP_Distributor_Margin,
        userType: 'Superdistributor',
        create: `${new Date().toISOString()}`,
        update: `${new Date().toISOString()}`
    });

    // ✅ PDF Upload States
    const [aadharFile, setAadharFile] = useState([]);
    const [panFile, setPanFile] = useState([]);
    const [shopImageFile, setShopImageFile] = useState([]);
    const [labourLicenseFile, setLabourLicenseFile] = useState([]);
    const [cancelledCheckFile, setCancelledCheckFile] = useState([]);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const onFinish = async () => {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        // ✅ Append PDF Files to FormData
        if (aadharFile.length) data.append('aadharUrl', aadharFile[0].originFileObj);
        if (panFile.length) data.append('panUrl', panFile[0].originFileObj);
        if (shopImageFile.length) data.append('shopImageUrl', shopImageFile[0].originFileObj);
        if (labourLicenseFile.length) data.append('labourLicenseUrl', labourLicenseFile[0].originFileObj);
        if (cancelledCheckFile.length) data.append('cancelledCheckUrl', cancelledCheckFile[0].originFileObj);


        try {
            const res = await createSuperDistributor(data).unwrap();
            toast.success(res?.message);
            navigate('/dashboard/superdistributor');
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };


    return (
        <div style={{position:"relative"}}>{isLoading?<Spinner loading={isLoading} tip="Submitting"/>:<div style={{ width: "80%", margin: "auto",opacity:isLoading?0.6:1 }}>
        <h3>Add Super Distributor</h3>
        <Steps current={current} items={steps} />
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
                                    value={formData.aadharNumber} // Ensure controlled input
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                        value = value.slice(0, 12); // Limit to 12 digits
                                        value = value.replace(/(\d{4})/g, "$1 ").trim(); // Format with spaces

                                        form.setFieldsValue({ aadharNumber: value }); // Update Ant Design form state
                                        setFormData((prev) => ({
                                            ...prev,
                                            aadharNumber: value, // Update React state
                                        }));
                                    }}
                                    name="aadharNumber"
                                />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter DOB" }]}>
                                <DatePicker style={{ width: "100%" }} onChange={(date) => setFormData({ ...formData, dob: new Date(date).toISOString() })} value={formData.dob} name="dob" />
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
                                <PdfUploader label="Aadhaar" fileList={aadharFile} setFileList={setAadharFile} />
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
                                <Input maxLength={10} onChange={handleInputChange} value={formData.panNumber} name="panNumber"/>
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item >
                                <PdfUploader label="PAN Card" fileList={panFile} setFileList={setPanFile} />
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
                                name="labourLicenseNumber"
                                label="Labour License Number"
                            >
                                <Input value={formData.businessLabourLicenseNumber} onChange={handleInputChange} name="businessLabourLicenseNumber" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="proprietorName"
                                label="Proprietor Name"
                                rules={[{ required: true, message: "Please enter Proprietor Name" }]}
                            >
                                <Input value={formData.businessProprietorName} onChange={handleInputChange} name="businessProprietorName" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item >
                                <PdfUploader label="Shop Image" fileList={shopImageFile} setFileList={setShopImageFile} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <PdfUploader label="Labour License" fileList={labourLicenseFile} setFileList={setLabourLicenseFile} />
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
                                name="bankAccountHolder"
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
                                name="ifscCode"
                                label="IFSC Code"
                                rules={[
                                    { required: true, message: "Please enter IFSC Code" },
                                    { pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: "Enter a valid IFSC Code (e.g., ABCD0123456)" }
                                ]}
                                normalize={(value) => value.toUpperCase()} // Automatically converts input to uppercase
                            >
                                <Input maxLength={11} onChange={handleInputChange} value={formData.IFSC} name="IFSC"/>
                            </Form.Item>

                        </Col>

                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item >
                                <PdfUploader label="Cancelled Check" fileList={cancelledCheckFile} setFileList={setCancelledCheckFile} />
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
                        Submit
                    </Button>
                )}
                {current > 0 && (
                    <Button className="previous-button" onClick={prev}>
                        Previous
                    </Button>
                )}
            </div>
        </Form>
    </div>}</div>

    );
};

export default AddSuperdistributor;
