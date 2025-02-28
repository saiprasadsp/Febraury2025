import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useGetDistributorMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
                name:item.first_name,
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
        navigate(`/dashboard/approval/getDistributor/${id}`);
      };
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
          dataIndex: 'view',
          render:(_,record)=>
            (<Button  onClick={() => handleView(record.ID)}>View</Button>)
          
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
