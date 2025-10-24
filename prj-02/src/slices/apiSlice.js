import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";
import { setLogout } from "../redux/authSlice";
import { setShowSessionConflict } from "../redux/authSlice";
const baseQuery = fetchBaseQuery({baseUrl:`${process.env.REACT_APP_API}`,credentials:"include"})

const baseQueryWithAuth = async(args,api,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions);

    if (result.error ) {
        if (result.error.status===401) {
            api.dispatch(setShowSessionConflict(result.error.data.message))
            return
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery:baseQueryWithAuth,
    tagTypes:['Users'],
    endpoints:(builder)=>({}),
})