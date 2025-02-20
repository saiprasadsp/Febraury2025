import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useGetDistributorMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const columns = [
  {
    title: 'DB ID',
    dataIndex: 'ID',
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '15%',
  },
  {
    title: 'Distributor Name',
    dataIndex: 'name',
    sorter: (a, b) => a.age - b.age,
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
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'KYC Status',
    dataIndex: 'kyc',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Actions',
    dataIndex: 'Actions',
    sorter: (a, b) => a.age - b.age,
  },
];


export default function KYCApproval() {
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
            name:item.first_name,
            mobile:item.user_mobile,
            doj:item.doj,
            kyc:item.kyc_status,

           }))
           setData(formattedData)
           console.log(res,'step4');
           dispatch()
           navigate('/dashboard')
         } catch (err) {
           toast.error(err?.data?.message||err.error);
         }
       
       }
       fetchDistributor();
    },[])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  
  };
  return (
    <div>  <Table columns={columns} onChange={onChange} dataSource={data}/>
</div>
  )
}
