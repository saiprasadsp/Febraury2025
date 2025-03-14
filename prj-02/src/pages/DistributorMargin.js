import React, { useState } from "react";
import { Button, Steps, message, Upload, Image, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/AddDistributor.css";

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
    const [aadharUrl, setAadharUrl] = useState([]);
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

    const onFinish = (values) => {
        console.log("Form submitted:", values);
        message.success("Distributor added successfully!");
        navigate("/dashboard/distributor");
    };
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
                                    <Input />
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
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            value = value.slice(0, 12); // Limit to 12 digits
                                            value = value.replace(/(\d{4})/g, "$1 ").trim(); // Add space after every 4 digits
                                            form.setFieldsValue({ aadharNumber: value }); // Set formatted value in form
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter DOB" }]}>
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select gender" }]}>
                                    <Select>
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Female">Other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={16}>
                                <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter Address" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter state" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="District" name="district" rules={[{ required: true, message: "Please enter district" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: "Please enter pincode" }]}>
                                    <Input maxLength={6} />
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
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            form.setFieldsValue({ mobileNumber: value }); // Set formatted value in form
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                    <Input />
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
                                    <Input />
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
                                    <Input maxLength={10} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Upload listType="picture-card" onPreview={handlePreview}>
                                    {uploadButton}
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="businessCategory"
                                    label="Business Category"
                                    rules={[{ required: true, message: "Please select Business Category" }]}
                                >
                                    <Input />

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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="businessState"
                                    label="State"
                                    rules={[{ required: true, message: "Please enter State" }]}
                                >
                                    <Input />
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
                                    <Input />
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
                                    <Input maxLength={6} />
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="proprietorName"
                                    label="Proprietor Name"
                                    rules={[{ required: true, message: "Please enter Proprietor Name" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="ShopPhoto"
                                    label="Shop Photo"
                                >
                                    <Upload listType="picture-card" onPreview={handlePreview}>
                                        {uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="labourLicenseDocument"
                                    label="Labour License Document"
                                >
                                    <Upload listType="picture-card" onPreview={handlePreview}>
                                        {uploadButton}
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="bankAccountHolder"
                                    label="Account Holder Name"
                                    rules={[{ required: true, message: "Please enter Account Holder Name" }]}
                                >
                                    <Input />
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
                                    <Input maxLength={18} />
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
                                    <Input maxLength={11} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="cancelledCheque"
                                    label="Cancelled Cheque / Passbook"
                                >
                                    <Upload listType="picture-card" onPreview={handlePreview}>
                                        {uploadButton}
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
