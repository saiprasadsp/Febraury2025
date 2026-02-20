import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  useGetPayInReportsMutation,
  useRetailerMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Input, Space, Button, DatePicker, Radio } from "antd";
import { CiSearch } from "react-icons/ci";
import Highlighter from "react-highlight-words";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

export default function PayInReports() {
  const [cBalance, setCBalance] = useState(0);
  const [bName, setBName] = useState("");
  const navigate = useNavigate();
  const [retailer] = useRetailerMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getPayInReports] = useGetPayInReportsMutation();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getPayInReports().unwrap();
        if (res?.count === 0) {
          toast.success(res?.message);
        } else {
          const formattedData = res?.data?.map((item, index) => ({
            id: index,
            payment_date: item.payment_date,
            user_id: item.user_id,
            order_id: item.order_id,
            amount: item.amount,
            charges: item.amount - item.charges,
            status: item.status,
          }));
          setTransactions(formattedData);
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [getPayInReports, userInfo]);
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await retailer({ customerID: userInfo.id });
        setCBalance(response.data.wallet?.wallet_balance);
        setBName(response.data.wallet?.business_name);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message);
      }
    };
    fetchDashboard();
  }, []);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<CiSearch />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <CiSearch style={{ color: filtered ? "#1677ff" : '#fff' }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "payment_date",
      key: "payment_date",
      width: "20%",
      ...getColumnSearchProps("payment_date"),
    },
    {
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
      width: "10%",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "Order Id",
      dataIndex: "order_id",
      key: "order_id",
      width: "30%",
      ...getColumnSearchProps("order_id"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
      sorter: (a, b) => a.amount.length - b.amount.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Charges",
      dataIndex: "charges",
      key: "charges",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width:'10%'
    },
  ];

  const handleDate = async (value, dateString) => {
    let fromDate = dateString[0];
    let toDate = dateString[1];

    try {
      const res = await getPayInReports({
        fromDate: fromDate,
        toDate: toDate,
      }).unwrap();
      const formattedData = res?.data?.map((item, index) => ({
         id: index,
            payment_date: item.payment_date,
            user_id: item.user_id,
            order_id: item.order_id,
            amount: item.amount,
            charges: item.amount - item.charges,
            status: item.status,
      }));
      setTransactions(formattedData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <RangePicker
        format={dateFormat}
        onChange={(value, dateString) => handleDate(value, dateString)}
      />
      <Table columns={columns} dataSource={transactions} placement="topRight" />
    </div>
  );
}
