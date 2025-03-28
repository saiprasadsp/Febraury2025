import React, { useEffect, useState } from 'react'
import { Button, Steps, message, Upload, Image, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useGetDistributorDetailsMutation } from '../slices/usersApiSlice'
import PdfUploader from "./PdfUploader"; // ✅ Import PdfUploader
import "../styles/ApproveDistributor.css";


const { Option } = Select;

const steps = [
    { title: "Aadhaar Details" },
    { title: "PAN Details" },
    { title: "Business Details" },
    { title: "Bank Details" },
];


export default function DistributorDetails() {
    const [current, setCurrent] = useState(0);
    const { id } = useParams()
    const [data, setData] = useState([])
    const [form] = Form.useForm();
    // const [data,setdata] 
    const [getDistributorDetails, { isLoading }] = useGetDistributorDetailsMutation()

    useEffect(() => {
        async function getDistributorDetail() {
            const res = await getDistributorDetails({ ditributorId: id }).unwrap();
            console.log("Distributor Details:", res); // Debugging

            setData(res);

            // ✅ Set Aadhaar file uploader state if aadhar_url exists
            if (res.aadhar_url) {
                setAadharFile([{
                    uid: '-1',
                    name: 'Aadhaar.pdf',
                    status: 'done',
                    url: res.aadhar_url
                }]);
            }
        }

        getDistributorDetail();
    }, []);

    // ✅ PDF Upload States
    const [aadharFile, setAadharFile] = useState([]);
    const [panFile, setPanFile] = useState([]);
    const [shopImageFile, setShopImageFile] = useState([]);
    const [labourLicenseFile, setLabourLicenseFile] = useState([]);
    const [cancelledCheckFile, setCancelledCheckFile] = useState([]);
    const [formData, setFormData] = useState({}); // ✅ Define formData state


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

        console.log(data);


    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };



    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h4>View Distributor</h4>
            <Steps current={current} items={steps} />
            {data.map((item) => (<>
                <Form layout="vertical" initialValues={{
                    aadharName: item.name_as_per_aadhaar,
                    aadharNumber: item.aadhar_number,
                    doj: new Date().toISOString(), // Adding Date of Joining (doj)

                    gender: item.gender,
                    address: item.address,
                    state: item.state,
                    district: item.district,
                    mobileNumber: item.user_mobile,
                    pincode: item.pincode,
                    email: item.user_email,
                    aadharUrl: item.aadhar_url,
                    kycstatus: item.kyc_status,


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
                                    <Form.Item name="aadharUrl">
                                        <PdfUploader
                                            label="Aadhaar"
                                            fileList={aadharFile}
                                            setFileList={setAadharFile}
                                            initialFiles={["https://your-s3-bucket-url/aadhar.pdf"]} // Replace with actual URL(s)
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
                                        <Input maxLength={10} />
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
                                        <Input maxLength={11} />
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

                        {/* Ensure item exists before rendering */}
                        {item && (
                            <>
                                {current < steps.length - 1 && (
                                    <Button type="primary" className="next-button" onClick={next}>
                                        Next
                                    </Button>
                                )}

                                {["Pending", "Rejected"].includes(item.kyc_status) && current === steps.length - 1 && (
                                    <>
                                        <Button type="primary" className="done-button" htmlType="submit">
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
