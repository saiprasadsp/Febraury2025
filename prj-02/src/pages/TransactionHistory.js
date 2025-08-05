import { Table, Button, DatePicker, Space, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useOrderHistoryMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/GetDistributor.css'
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { DownloadOutlined } from '@ant-design/icons';
import logo from "../assets/logo/TheQucikPayMe.png";

const { RangePicker } = DatePicker;

export default function TransactionHistory() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dates, setDates] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [orderHistory, { isLoading }] = useOrderHistoryMutation();

 const generateInvoicePDF = async (record) => {
  const doc = new jsPDF("landscape", "pt", "a4");

  const logoUrl = logo;

  const toBase64 = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Image fetch failed:", error);
    toast.error("Logo fetch failed. Check the image URL or CORS.");
    return null;
  }
};


  const logoData = await toBase64(logoUrl);
if (logoData) {
  doc.addImage(logoData, "PNG", 40, 40, 120, 60);
}

  doc.setFont("helvetica", "bold");

  // Main container
  doc.setDrawColor("#e4e4e7");
  doc.roundedRect(30, 100, 750, 250, 12, 12);

  // Order Info
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.setFontSize(11);
  doc.text("Order id", 50, 120);
  doc.setTextColor("#000000");
  doc.setFont("helvetica", "bold");
  doc.text(record.transactionid || "N/A", 50, 140);

  doc.setTextColor("#6b7280");
  doc.setFont("helvetica", "normal");
  doc.text("Date & Time", 500, 120);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text(
    record.Date ? dayjs(record.Date).format("DD-MM-YYYY hh:mm A") : "N/A",
    500,
    140
  );

  // Customer Info
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.text("Customer Information", 50, 170);
  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("Name", 50, 190);
  doc.setFont("helvetica", "normal");
  doc.text(" ", 120, 190);

  doc.setFont("helvetica", "bold");
  doc.text("Mobile Number", 50, 210);
  doc.setFont("helvetica", "normal");
  doc.text(" ", 150, 210);

  // Payment Details
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.text("Payment Details", 480, 170);

  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("Payment Amount", 480, 190);
  doc.setFont("helvetica", "normal");
  doc.text(` ${Number(record.amount || 0).toFixed(2)}`, 600, 190);

  doc.setFont("helvetica", "bold");
  doc.setTextColor("#000000");
  doc.text("Charges", 480, 210);
  doc.setFont("helvetica", "normal");
  doc.text(` ${Number(record.charges || 0).toFixed(2)}`, 620, 210);

  doc.setFont("helvetica", "bold");
  doc.text("Credited Amount", 480, 230);
  doc.setFont("helvetica", "normal");
  doc.text(` ${Number(record.creditamount || 0).toFixed(2)}`, 630, 230);

  // Transaction Status
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#6b7280");
  doc.text("Transaction Status", 50, 250);
  doc.setTextColor(
    record.status?.toUpperCase() === "SUCCESS" ? "#008000" : "#FF0000"
  );
  doc.setFont("helvetica", "bold");
  doc.text(record.status?.toUpperCase() || "N/A", 180, 250);

  doc.save(`Invoice_${record.transactionid || "TXN"}.pdf`);
};


    useEffect(() => {
        const fetchDistributor = async () => {
            try {
                const res = await orderHistory({ userId: userInfo.id }).unwrap();
                console.log(res);


                const formattedData = res?.orders.map((item, index) => ({
                    key: index,
                    sno: index + 1,
                    Date: item.payment_date,
                    transactionid: item.order_id,
                    amount: item.amount,
                    charges: item.charges,
                    creditamount: item.amount-item.charges,
                    status: item.status,
                    invoice_id: item.invoice_id,
    customer_name: item.customer_name,
    mobile_number: item.mobile_number,

                     

                }));
                setData(formattedData);
                setFilteredData(formattedData);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        };
        fetchDistributor();
    }, []);

    const handleSearch = () => {
        if (dates.length === 2) {
            const [start, end] = dates;
            const filtered = data.filter(item => {
                const itemDate = new Date(item.Date);
                return itemDate >= start && itemDate <= end;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

 const columns = [
        { title: "S.No", dataIndex: "sno", width: "5%" },
        { title: "Customre Details", width: "10%", 
          render: (_, record) => (
    <>
      <div> {record.invoice_id}</div>
      <div> {record.customer_name}</div>
      <div>{record.mobile_number}</div>
    </>
  ),
        },
        {
            title: "Transaction Date",
            dataIndex: "Date",
            width: "12%",
            render: (date) => dayjs(date).format("DD-MM-YYYY hh:mm A"),
        },
        { title: "Transaction ID", dataIndex: "transactionid", width: "18%" },
        { title: "Amount", dataIndex: "amount", width: "5%" },
        { title: "Charges", dataIndex: "charges", width: "8%" },
        { title: "Credit Amount", dataIndex: "creditamount", width: "8%" },
        { title: "Status", dataIndex: "status", width: "7%" },
       {
  title: "Action",
  dataIndex: "invoice",
  width: "8%",
  render: (_, record) => (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={() => generateInvoicePDF(record)}
      style={{
        backgroundColor: "#1F6281", // Tailwind's blue-600
        border: "none",
        borderRadius: "6px",
        fontWeight: "500",
        fontSize: "13px"
      }}
    >
      Invoice
    </Button>
  ),
}
    ];

    return (
        <div>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <RangePicker
                    onChange={(values) => {
                        if (values) {
                            setDates([values[0].toDate(), values[1].toDate()]);
                        } else {
                            setDates([]);
                        }
                    }}
                />
                <Button className="search-button" onClick={handleSearch}>Search</Button>
            </div>
            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
}
