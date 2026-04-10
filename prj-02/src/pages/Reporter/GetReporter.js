import { Table,Tooltip,Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  useGetReporterMutation } from '../../slices/usersApiSlice';
export default function Reports() {
      const [data,setData] = useState([])

    const [getReporter,{isLoading}]=useGetReporterMutation()

  useEffect(()=>{

          const fetchDistributor = async()=>{
               try {
                 const res = await getReporter().unwrap();
                 console.log(res);

                 const formattedData = res.map((item)=>({
                  key:item.ID,
                  ID:item.reporter_id,
                  empId:item.reporter_emp_id,
                  name:item.reporter_name,
                  mobile:item.reporter_mobile,
                  email:item.reporter_email,
                  kyc:item.status,
                  status:item.distributor_status===1 ? "Active" :'De-Active'

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
                  // navigate(`/dashboard/reporter/getReporter/${id}`);
                };


  const columns = [
          {
            title: "Reporter ID",
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
            title: "Employee ID",
            dataIndex: "empId",
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
            title: 'Employee Name',
            dataIndex: 'name',
            width: "25%",
            render: (text) => (
                <Tooltip title={text}>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px", display: "inline-block" }}>
                        {text}
                    </span>
                </Tooltip>
            ),
        },{
            title: 'Email',
            dataIndex: 'email',
            // render: (date) => {
            //   return new Date(date).toLocaleDateString('en-GB', {
            //     day: '2-digit',
            //     month: 'long',
            //     year: 'numeric',
            //   });
            // },
            width: "18%",
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
        ];
  return (
    <div>
      <div>
        <button type="button" className="btn btn-warning"><Link to='addReporter'>Add Reporter</Link></button>
      </div>
        <Table className="custom-distributor-table" columns={columns} onChange={onChange} dataSource={data} rowKey={(record, index) => record.key ?? record.id ?? record.ID ?? record.transactionid ?? index} />

        </div>
  )
}
