import React, { useEffect, useState } from 'react'
import { useGetDistributorDetailsMutation } from '../slices/usersApiSlice'
import { useParams } from 'react-router-dom'

export default function DistributorDetails() {
    const {id} = useParams()
    const [data,setData] = useState([])
    const [getDistributorDetails,{isLoading}]=useGetDistributorDetailsMutation()

    useEffect(()=>{
        async function getDistributorDetail(){
            const res = await getDistributorDetails({ditributorId:id}).unwrap()
            console.log(res);
            
            setData(res)
            
        }

        getDistributorDetail()
    },[])
    
  return (
    <div>
        <div>
           
           {data.map((item)=>(
            <ul>
                <li key={item.ID}>{item.ID}</li>
                <li>{item.distributor_id}</li>
                <li>{item.first_name}</li>
                <li>{item.last_name}</li>
                <li>{item.user_mobile}</li>
                <li>{item.aadhar_number}</li>
                <li>{item.pan_number}</li>
                <li><img src={item.aadhar_url} className='rounded float-start' alt='image not found'/> </li>
                <li><img src={item.pan_url} className='rounded float-start' alt='image not found'/> </li>
                <li>{item.doj}</li>
                <li><img src={item.profile_url} className='rounded float-start' alt='image not found'/> </li>
            </ul>
           ))}
        </div>
    </div>
  )
}
