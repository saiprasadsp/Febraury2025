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
                // key:item.ID,
                // ID:item.distributor_id,
                // name:item.name_as_per_aadhaar,
                // mobile:item.user_mobile,
                // doj:item.doj,
                // kyc:item.kyc_status,
    
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
      },
      {
        title: "Account Number",
        dataIndex: "account number",   
        width: "18%",
      },
        {
          title: 'IFSC Code',
          dataIndex: 'Ifsc',
          width: "18%",
        },   
        {
          title: 'Mobile Number',
          dataIndex: 'mobilenumber',
          width: "15%",
      },     
        {
          title: "Transfer",
          dataIndex: "transfer", 
          width: "15%",
        },
       
      ];
      return (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <Link to="../addnewbankaccount">
              <button type="button" className="btn btn-warning">Add Bank Account</button>
            </Link>
          </div>
          
          <Table columns={columns} onChange={onChange} dataSource={data} />
        </div>
      );
}
