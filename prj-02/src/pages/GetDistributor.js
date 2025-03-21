import { Table, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetDistributorMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/GetDistributor.css";
import { Tooltip } from 'antd';

export default function GetDistributor() {
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
        console.log('params', pagination, filters, sorter, extra);
      
      };
      const handleView = (id) => {
        navigate(`/dashboard/distributor/getDistributor/${id}`);
      };
      const columns = [
        {
          title: "DB ID",
          dataIndex: "ID",
          filters: data
            ? data.map((item) => ({
                text: item.ID.toString(),
                value: item.ID.toString(),
              }))
            : [],
          filterMode: "menu", // Removes "Select All"
          filterSearch: (input, record) => record.value.includes(input), // Shows only matched results
          onFilter: (value, record) => record.ID.toString().includes(value),
          width: "15%",
        }
        ,        
        {
          title: 'Distributor Name',
          dataIndex: 'name',
          width: 250,
          render: (text) => (
              <Tooltip title={text}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "150px", display: "inline-block" }}>
                      {text}
                  </span>
              </Tooltip>
          ),
      },
        {
          title: 'Mobile Number',
          dataIndex: 'mobile',
          
          onFilter: (value, record) => record.address.startsWith(value),
          filterSearch: true,
          width: '20%',
        },
        {
          title: 'DOJ',
          dataIndex: 'doj',
          render: (date) => {
            return new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });
          },
        },        
        {
          title: 'KYC Status',
          dataIndex: 'kyc',
          
        },
        {
          title: 'Actions',
          dataIndex: 'view',
          width: 100,
          render: (_, record) => (
              <Button className="view-button"  onClick={() => handleView(record.ID)}>View</Button>
          ),
      },
      ];
  return (
    <div>
      <div>
        <button type="button" className="btn btn-warning"><Link to='addDistributor'>Add Distributor</Link></button>
      </div>
        <Table columns={columns} onChange={onChange} dataSource={data}/>
       
        </div>
  )
}
