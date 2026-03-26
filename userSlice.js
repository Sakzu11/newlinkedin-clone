import {createslice} from '@reduxjs/toolkit';
export const counterSlice=createSlice({
    name:'user',
    initializeState:{
        user:null,
    },
 
    reducers:{
      login:(state,action) =>{
        state.value =action.payload;

      },
    logout:(state)=>{
        state.user =null;
    },
   }
});
export const {login,logout}=userSlice.actions;

export const selectuser=(state)=> state.user.user;

export default userslice.reducer;
