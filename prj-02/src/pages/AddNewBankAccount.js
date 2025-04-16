import React from 'react';
import { Card, Form, Select, Input, Typography, Row, Col, Button } from 'antd';
import '../styles/AddNewBankAccount.css'; // Import CSS

const { Title } = Typography;
const { Option } = Select;

export default function AddNewBankAccount() {
  return (
    <Row justify="center">
      <Col xs={24} sm={18} md={12}>
        <Card className="bank-card">
          <Title level={4} className="form-title">Add New Bank Account</Title>

          <Form layout="vertical">
            <Form.Item label="Select Bank" name="bank" >
              <Select placeholder="Select a bank" className="custom-input">
                <Option value="hdfc">HDFC</Option>
                <Option value="sbi">SBI</Option>
                <Option value="icici">ICICI</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Account Number" name="accountNumber" rules={[{ required: true, message: "Enter Account Number" }]}>
              <Input placeholder="Enter account number" className="custom-input" />
            </Form.Item>

            <Form.Item label="IFSC Code" name="ifsc" rules={[{ required: true, message: "Enter IFSC Code" }]}>
              <Input placeholder="Enter IFSC code" className="custom-input" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="get-details-button">Get Details</Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
