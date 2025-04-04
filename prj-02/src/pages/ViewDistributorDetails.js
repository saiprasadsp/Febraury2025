import React, { useEffect, useState } from 'react'
import { useGetDistributorDetailsMutation } from '../slices/usersApiSlice'
import { useParams } from 'react-router-dom'
import { Button, Steps, message, Upload, Image, Form, Input, Select, DatePicker, Row, Col } from "antd";
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
export default function DistributorDetails() {
    const [current, setCurrent] = useState(0);
    const { id } = useParams()
    const [data, setData] = useState([])
    // const [data,setdata] 
    const [getDistributorDetails, { isLoading }] = useGetDistributorDetailsMutation()

    useEffect(() => {
        async function getDistributorDetail() {
            const res = await getDistributorDetails({ ditributorId: id }).unwrap()
            setData(res)

        }

        getDistributorDetail()
    }, [])
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
    };

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);


    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h4>View Distributor</h4>
            <Steps current={current} items={steps} />
            {data.map((item) => (<>
                <Form layout="vertical" initialValues={{
                    aadharName: item.name_as_per_aadhaar,
                    aadharNumber: item.aadhar_number,
                    dob: item.dob,
                    gender: item.gender,
                    address: item.address,
                    state: item.state,
                    district: item.district,
                    mobileNumber: item.user_mobile,
                    pincode: item.pincode,
                    email: item.user_email,
                    aadharUrl: item.aadhar_url,

                    panName: item.name_as_per_pan,
                    panNumber: item.pan_number,
                    businessName: item.bank_name,
                    businessCategory: item.business_category,
                    businessAddress: item.business_address,
                    businessState: item.business_state,
                    businessDistrict: item.business_district,
                    businessPincode: item.business_pincode,
                    labourLicenseNumber: item.business_labour_license_Number,
                    proprietorName: item.business_proprietor_Name,
                    ShopPhoto: item.shop_photo_url,
                    labourLicenseDocument: item.business_ll_url,

                    bankName: item.bank_name,
                    bankAccountHolder: item.account_holder_name,
                    accountNumber: item.account_number,
                    ifscCode: item.ifsc_code,
                    cancelledCheque: item.cancelled_check_url,

                }}>

                    {current === 0 && (
                        <>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Name as per Aadhaar" name="aadharName" rules={[{ required: true, message: "Please enter Aadhaar name" }]}>
                                        <Input value='Murali' name="aadharName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>

                                <Form.Item label="Name as per Aadhaar" name="aadharNumber" rules={[{ required: true, message: "Please enter Aadhaar name" }]}>
                                        <Input value='Murali' name="aadharNumber" />
                                    </Form.Item>
                                </Col>


                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter DOB" }]}>
                                        {/* <DatePicker style={{ width: "100%" }} name="dob" /> */}
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Gender"
                                        name="gender"
                                        rules={[{ required: true, message: "Please select gender" }]}
                                        initialValue={data.gender}
                                    >
                                        <Select
                                            value={data.gender}
                                            onChange={(value) => setData({ ...data, gender: value })}
                                        >
                                            <Option value="Male">Male</Option>
                                            <Option value="Female">Female</Option>
                                            <Option value="Other">Other</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter Address" }]}>
                                        <Input value={data.address} name="address" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter state" }]}>
                                        <Input value={data.state} name="state" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="District" name="district" rules={[{ required: true, message: "Please enter district" }]}>
                                        <Input value={data.district} name="district" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: "Please enter pincode" }]}>
                                        <Input maxLength={6} value={data.pincode} name="pincode" />
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
                                            value={data.value}
                                            name="mobile"
                                        // onChange={(e) => {
                                        //     const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                        //     setdata({ ...data,mobile: value }); // Set formatted value in form
                                        // }}
                                        />
                                    </Form.Item>
                                </Col>

                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                                        <Input value={data.email} name="email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Upload Aadhaar" name="aadharUrl">
                                        <Upload
                                            listType="picture-card"
                                            // fileList={aadharUrl}
                                            onPreview={handlePreview}
                                        // onChange={({ fileList }) => setAadharUrl(fileList)}
                                        >
                                            {/* {aadharUrl.length >= 1 ? null : uploadButton} */}
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
                                        <Input value={data.panName} name="panName" />
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
                                        <Input maxLength={10} value={data.panNumber} name="panNumber" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Upload
                                        listType="picture-card"
                                        // fileList={panUrl}
                                        onPreview={handlePreview}
                                    // onChange={({ fileList }) => setPanUrl(fileList)}
                                    >
                                        {/* {panUrl.length >= 1 ? null : uploadButton} */}
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
                                        <Input value={data.businessName} name="businessName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessCategory"
                                        label="Business Category"
                                        rules={[{ required: true, message: "Please select Business Category" }]}
                                    >
                                        <Input value={data.businessCategory} name="businessCategory" />

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
                                        <Input value={data.businessAddress} name="businessAddress" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="businessState"
                                        label="State"
                                        rules={[{ required: true, message: "Please enter State" }]}
                                    >
                                        <Input value={data.businessState} name="businessState" />
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
                                        <Input value={data.businessDistrict} name="businessDistrict" />
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
                                        <Input maxLength={6} value={data.businessPincode} name="businessPincode" />
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
                                        <Input value={data.businessLabourLicenseNumber} name="businessLabourLicenseNumber" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="proprietorName"
                                        label="Proprietor Name"
                                        rules={[{ required: true, message: "Please enter Proprietor Name" }]}
                                    >
                                        <Input value={data.businessProprietorName} name="businessProprietorName" />
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
                                            // fileList={shopImageUrl}
                                            onPreview={handlePreview}
                                        // onChange={({ fileList }) => setShopImageUrl(fileList)}
                                        >
                                            {/* {shopImageUrl.length >= 1 ? null : uploadButton} */}
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
                                            // fileList={labourLicenseUrl}
                                            onPreview={handlePreview}
                                        // onChange={({ fileList }) => setLabourLicenseUrl(fileList)}
                                        >
                                            {/* {labourLicenseUrl.length >= 1 ? null : uploadButton} */}
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
                                        <Input value={data.bankName} name="bankName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="bankAccountHolder"
                                        label="Account Holder Name"
                                        rules={[{ required: true, message: "Please enter Account Holder Name" }]}
                                    >
                                        <Input value={data.accountName} name="accountName" />
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
                                        <Input maxLength={18} value={data.accountNumber} name="accountNumber" />
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
                                        <Input maxLength={11} value={data.IFSC} name="IFSC" />
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
                                            // fileList={cancelledCheckUrl}
                                            onPreview={handlePreview}
                                        // onChange={({ fileList }) => setCancelledCheckUrl(fileList)}
                                        >
                                            {/* {cancelledCheckUrl.length >= 1 ? null : uploadButton} */}
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
                                Update
                            </Button>

                        )} {current === steps.length - 1 && (
                            <Button type="primary" className="done-button" htmlType="submit">
                                Approve
                            </Button>

                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" className="done-button" htmlType="submit">
                                Reject
                            </Button>

                        )}
                        {current > 0 && (
                            <Button className="previous-button" onClick={prev}>
                                Previous
                            </Button>
                        )}
                    </div>
                </Form>
            </>))}

        </div>
    );
}
