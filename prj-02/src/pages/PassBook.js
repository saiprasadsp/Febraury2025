import { Table, Button, DatePicker, Space, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useOrderHistoryMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dates, setDates] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [orderHistory, { isLoading }] = useOrderHistoryMutation();

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const res = await orderHistory({ userId: userInfo.id }).unwrap();
        console.log("step 10", res);

        const formattedData = res.map((item, index) => ({
          key: index,
          Date: item.created_timestamp,
          transactionid: item.order_id,
          amount: item.order_amount,
          charges: item.order_charges,
          creditamount: item.order_credited_amount,
          status: item.status
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
    {
      title: "Date",
      dataIndex: "Date",
      width: "10%",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    { title: "TXN ID", dataIndex: "transactionid", width: "18%" },
    { title: "TXN Type", dataIndex: "transactionidtype", width: "15%" },
    { title: "Before Balance", dataIndex: "beforebalance", width: "10%" },
    { title: "Credit", dataIndex: "Credit", width: "10%" },
    { title: "Debit", dataIndex: "Credit", width: "10%" },
    { title: "After Balance", dataIndex: "afterbalance", width: "10%" },
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
