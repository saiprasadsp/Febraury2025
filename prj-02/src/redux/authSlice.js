import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
    isAuthenticated:localStorage.getItem('userInfo')?true:false,
    sessionConflict:null
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.userInfo=action.payload;
            state.isAuthenticated=true;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        
        
        },
        setLogout:(state)=>{
            state.userInfo=null;
            state.isAuthenticated=false;
            state.sessionConflict=null;
            localStorage.removeItem("userInfo");


        },
        setShowSessionConflict:(state,action)=>{
            state.sessionConflict=action.payload
        },
        clearSessionConflict:(state)=>{
            state.sessionConflict=null;
        }
    }
})

export const{setLogin,setLogout,setShowSessionConflict,clearSessionConflict}=authSlice.actions;

export default authSlice.reducer