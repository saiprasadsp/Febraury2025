import { Table, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useActivateSuperDistributorMutation, useGetSuperDistributorMutation } from '../../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/GetDistributor.css'
import { Tooltip } from 'antd';

export default function GetDistributor() {
    const [data,setData] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state)=>state.auth)
  const [getSuperDistributor,{isLoading}]=useGetSuperDistributorMutation()
  const [activateSuperDistributor]=useActivateSuperDistributorMutation()
    useEffect(()=>{

        const fetchDistributor = async()=>{
             try {
               const res = await getSuperDistributor().unwrap();

               const formattedData = res.map((item)=>({
                key:item.ID,
                ID:item.superdistributor_id,
                name:item.name_as_per_aadhaar,
                mobile:item.user_mobile,
                doj:item.doj,
                kyc:item.kyc_status,
                status:item.superdistributor_status===1 ? "Active" :'De-Active'

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
        navigate(`/dashboard/superdistributor/getSuperDistributor/${id}`);
      };

      const handleStatus=async(row)=>{
        const updatedStatus = row.status === "Active" ? 0 : 1;
        const statusLabel = updatedStatus === 1 ? "Active" : "Dective";
        console.log('Step 1',updatedStatus);
        console.log('Step 2',statusLabel);


        Modal.confirm({
          title: "Confirm Status Change",
          content: `Are you sure you want to ${statusLabel} this distributor?`,
          okText: "Yes",
          cancelText: "No",
          onOk: async () => {
            try {
              const res = await activateSuperDistributor({
                id: row.ID,
                status: updatedStatus,
              }).unwrap();
              toast.success(res.message || "Status updated successfully");

              // update local state
              const newData = data.map((item) =>
                item.ID === row.ID
                  ? {
                      ...item,
                      status: updatedStatus === 1 ? "De-Active" : "Active",
                    }
                  : item
              );
              // await fetchDistributor()
              setData(newData);
            } catch (err) {
              toast.error(err?.data?.message || "Failed to update status");
            }
          },
          onCancel: () => {
            console.log("User cancelled status change");
          },
        });

      }
      const columns = [
        {
          title: "Super Distributor ID",
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
          title: 'Super Distributor Name',
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
        },{
          title:'Status',
          dataIndex:"status",
          width:"15%",
          render:(_,record)=>(
            <Button type={record.status === 1?'primary':'default'}  onClick={()=>handleStatus(record)}>{record.status}</Button>
          )
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
        <Table className="custom-distributor-table" columns={columns} onChange={onChange} dataSource={data}/>

        </div>
  )
}
