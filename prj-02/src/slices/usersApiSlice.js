import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:9000/api/users'
console.log('step 2',USERS_URL);

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
        })
    })
})

export const{useLoginMutation,useLogoutMutation,useUpdateUserMutation,useGetUserMutation,useCreateUserMutation} = usersApiSlice