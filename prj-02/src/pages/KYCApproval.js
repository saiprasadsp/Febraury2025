import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useGetDistributorMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const columns = [
  {
    title: 'DB ID',
    dataIndex: 'DB ID',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: '15%',
  },
  {
    title: 'Distributor Name',
    dataIndex: 'Distributor Name',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'Mobile Number',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '20%',
  },
  {
    title: 'DOJ',
    dataIndex: 'DOJ',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'KYC Status',
    dataIndex: 'KYC Status',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Actions',
    dataIndex: 'Actions',
    sorter: (a, b) => a.age - b.age,
  },
];


export default function KYCApproval() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [getDistributor,{isLoading}]=useGetDistributorMutation()
  useEffect(()=>{
    
    const fetchDistributor = async()=>{
         try {
           const res = await getDistributor().unwrap();
           console.log(res,'step4');
           dispatch()
           navigate('/dashboard')
         } catch (err) {
           toast.error(err?.data?.message||err.error);
           console.log(err);
         }
       
       }
       fetchDistributor();
    },[])
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  
  };
  return (
    <div>  <Table columns={columns} onChange={onChange} />
</div>
  )
}
