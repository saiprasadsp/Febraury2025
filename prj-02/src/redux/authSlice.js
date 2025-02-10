import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.userInfo=action.payload;
            state.isAuthenticated=true;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            if (state.isAuthenticated) {
                console.log("User logged in"); // ✅ Fixed (Explicit `if` statement)
              }
        
        },
        setLogout:(state)=>{
            state.userInfo=null;
            state.isAuthenticated=false;
            localStorage.removeItem("userInfo");

            // if (!state.isAuthenticated) {
            //     console.log("User logged out"); // ✅ Fixed (Explicit `if` statement)
            // }

        },
    }
})

export const{setLogin,setLogout}=authSlice.actions;

export default authSlice.reducer