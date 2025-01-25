import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    conversation: []
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        toggleUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setConversation: (state, action) => {
            state.conversation = action.payload;
        }
    }
})

export const { toggleUser, setConversation } = conversationSlice.actions;

export default conversationSlice.reducer;