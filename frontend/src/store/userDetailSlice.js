import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedInUser:''
}

const userSlice = createSlice({
    name: 'user',
    
    initialState,
    reducers:{
        setLoggedInUserDetails:(state,action)=>{
            state.loggedInUser = action.payload
        }
    }

})


export const { setLoggedInUserDetails } = userSlice.actions;

export default userSlice.reducer;