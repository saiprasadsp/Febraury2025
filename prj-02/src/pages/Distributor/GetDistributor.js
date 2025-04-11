import { Table, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetDistributorMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/GetDistributor.css'
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
      
      };
      const handleView = (id) => {
        navigate(`/dashboard/distributor/getDistributor/${id}`);
      };
      const columns = [
        {
          title: "Distributor ID",
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
        },        
        {
          title: 'Distributor Name',
          dataIndex: 'name',
          width: "25%",
          render: (text) => (
              <Tooltip title={text}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px", display: "inline-block" }}>
                      {text}
                  </span>
              </Tooltip>
          ),
      },
      {
        title: "Mobile Number",
        dataIndex: "mobile",  
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
          title: 'DOJ',
          dataIndex: 'doj',
          render: (date) => {
            return new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            });
          },
          width: "18%",
        },        
        {
          title: "KYC Status",
          dataIndex: "kyc",
          filters: data
            ? [...new Set(data.map((item) => item.kyc))] 
                .filter((status) => status) 
                .map((status) => ({
                  text: status.toString(),
                  value: status.toString(),
                }))
            : [],
          filterMode: "menu",
          filterSearch: (input, record) => record.value?.toString().toLowerCase().includes(input.toLowerCase()), 
          onFilter: (value, record) => record.kyc?.toString() === value, 
          width: "15%",
        }
        
        ,
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
