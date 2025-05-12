import { apiSlice } from "./apiSlice";


const USERS_URL = `${process.env.REACT_APP_API}/users`
const DISTRIBUTOR_LIST = `${process.env.REACT_APP_API}/distributor`
const RETAILER_LIST = `${process.env.REACT_APP_API}/retailer`
const DASHBOARD = `${process.env.REACT_APP_API}/dashboard`

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        dashboard:builder.mutation({
            query:(data)=>({
                    url:`${DASHBOARD}/`,
                    method:"POST",
                    body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                    url:`${USERS_URL}/auth`,
                    method:"POST",
                    body:data
            })
        }),
        accepTerms:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/terms`,
                method:'PUT',

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
        getUser:builder.query({
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
        approveDistributor:builder.mutation({
            query:(data)=>({
                url:`${DISTRIBUTOR_LIST}/approve`,
                method:'POST',
                body:data
            })
        }),
        createRetailer:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/register`,
                method:'POST',
                body:data
            })
        }),       
        getRetailer:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/profile`,
                method:'POST',
                body:data
            })
        }),
        getRetailerDetails:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/profile/id`,
                method:'POST',
                body:data
            })
        }),

        updateRetailer:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/profile`,
                method:'PUT',
                body:data
            })
        }),
        approveRetailer:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/approve`,
                method:'POST',
                body:data
            })
        }),
        updateRetailerPercentage:builder.mutation({
            query:(data)=>({
                url:`${RETAILER_LIST}/update`,
                method:'PUT',
                body:data,
            })
        })
    })
})

export const{useDashboardMutation,useLoginMutation,useAccepTermsMutation,useLogoutMutation,useUpdateUserMutation,useGetUserQuery,useCreateUserMutation,useGetDistributorMutation,useCreateDistributorMutation,useGetDistributorDetailsMutation,useUpdateDistributorMarginMutation,useUpdateDistributorMutation,useGetRetailerMutation,useCreateRetailerMutation,useApproveDistributorMutation,useGetRetailerDetailsMutation,useUpdateRetailerMutation,useApproveRetailerMutation,useUpdateRetailerPercentageMutation} = usersApiSlice

