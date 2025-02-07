import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false
}

const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
            localStorage.setItem("token", action.payload.token);
            if (state.isAuthenticated) {
                console.log("User logged in"); // ✅ Fixed (Explicit `if` statement)
              }
        
        },
        logout:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            localStorage.removeItem("token");

      if (!state.isAuthenticated) {
        console.log("User logged out"); // ✅ Fixed (Explicit `if` statement)
      }

        },
    }
})

export const{login,logout}=authSlice.actions;

export default authSlice.reducer