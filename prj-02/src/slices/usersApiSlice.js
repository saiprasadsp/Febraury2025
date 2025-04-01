import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:9000/api/users'
const DISTRIBUTOR_LIST = 'http://localhost:9000/api/distributor'
const RETAILER_LIST = 'http://localhost:9000/api/retailer'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                    url:`${USERS_URL}/auth`,
                    method:"POST",
                    body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:"POST",

            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data
            })
        }),
        getUser:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/profile`,
                method:'GET'
            })
        }),
        createUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/`,
                method:'POST',
                body:data
            })
        }),
        getDistributor:builder.mutation({
            query:()=>({
                url:`${DISTRIBUTOR_LIST}/profile`,
                method:'GET',
            })
        }),
        createDistributor:builder.mutation({
            query:(data)=>({
                url:`${DISTRIBUTOR_LIST}/register`,
                method:'POST',
                body:data
            })
        }),
        getDistributorDetails:builder.mutation({
            query:(data)=>({
                url:`${DISTRIBUTOR_LIST}/profile/id`,
                method:'POST',
                body:data
            })
        }),
        updateDistributorMargin:builder.mutation({
            query:(data)=>({
                url:`${DISTRIBUTOR_LIST}/update`,
                method:'PUT',
                body:data
            })
        }),
        updateDistributor:builder.mutation({
            query:(data)=>({
                url:`${DISTRIBUTOR_LIST}/profile`,
                method:'PUT',
                body:data
            })
        }),
        getRetailer:builder.mutation({
            query:()=>({
                url:`${RETAILER_LIST}/profile`,
                method:'GET',
            })
        }),
        createRetailer:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/register`,
                method:'POST',
                body:data
            })
        }),       
    })
})

export const{useLoginMutation,useLogoutMutation,useUpdateUserMutation,useGetUserMutation,useCreateUserMutation,useGetDistributorMutation,useCreateDistributorMutation,useGetDistributorDetailsMutation,useUpdateDistributorMarginMutation,useUpdateDistributorMutation,useGetRetailerMutation,useCreateRetailerMutation} = usersApiSlice