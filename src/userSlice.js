// import {createSlice} from '@reduxjs/toolkit';
// export const userSlice=createSlice({
//     name:'user',
//     initialState:{
//         user:exist,
//     },
 
//     reducers:{
//     login:(state ,action) =>
//       {
//         state.user =action.payload;
//       },
//      logout:(state)=>
//      {
//         state.user=null;
//      },
//    },
// });
// export const {login,logout}=userSlice.actions;
// export const selectuser=(state)=> state.user.user;

// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectuser = (state) => state.user.user;

export default userSlice.reducer;