import { Table, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetDistributorMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/GetDistributor.css'
import { Tooltip } from 'antd';

export default function BankTransfer() {
    const [data,setData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [getDistributor,{isLoading}]=useGetDistributorMutation()
    useEffect(()=>{
    
        const fetchDistributor = async()=>{
             try {
               const res = await getDistributor().unwrap();
               const formattedData = res.map((item)=>({
                key:item.ID,
                ID:item.distributor_id,
                name:item.name_as_per_aadhaar,
                mobile:item.user_mobile,
                doj:item.doj,
                kyc:item.kyc_status,
    
               }))
               setData(formattedData)
             } catch (err) {
               toast.error(err?.data?.message||err.error);
             }
           
           }
           fetchDistributor();
        },[])
    const onChange = (pagination, filters, sorter, extra) => {
      
      };
      const handleView = (id) => {
        navigate(`/dashboard/distributor/getDistributor/${id}`);
      };
      const columns = [
        {
          title: "S.No",
          dataIndex: "sno",
          width: "5%",
        },        
        {
          title: 'Name',
          dataIndex: 'names',
          width: "20%",
          render: (text) => (
              <Tooltip title={text}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px", display: "inline-block" }}>
                      {text}
                  </span>
              </Tooltip>
          ),
      },
      {
        title: "Account Number",
        dataIndex: "account number",  
        filters: data
          ? data
              .filter((item) => item.mobile) 
              .map((item) => ({
                text: item.mobile?.toString() || "",  
                value: item.mobile?.toString() || ""  
              }))
          : [],
        filterMode: "menu",
        filterSearch: (input, record) => record.value?.toString().includes(input),  
        onFilter: (value, record) => record.mobile?.toString().includes(value),  
        width: "18%",
      },
        {
          title: 'IFSC Code',
          dataIndex: 'Ifsc',
          width: "18%",
        },        
        {
          title: "Transfer",
          dataIndex: "transfer", 
          width: "15%",
        },
        {
          title: 'Actions',
          dataIndex: 'Delete',
          width: "15%",
          render: (_, record) => (
              <Button className="view-button"  onClick={() => handleView(record.ID)}>Delete</Button>
          ),
      },
      ];
      return (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Link to="../addnewbankaccount">
              <button type="button" className="btn btn-warning">Add New Bank Account</button>
            </Link>
          </div>
          
          <Table columns={columns} onChange={onChange} dataSource={data} />
        </div>
      );
}
