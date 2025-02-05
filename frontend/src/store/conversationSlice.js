import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    conversation: [],
    messages: [],
    refresh: false
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
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        toggleRefresh: (state, action) => {
            state.refresh = !state.refresh;
        },
        unsetSelectedUser: (state, action) => {
            state.selectedUser = null;
        }
    }
})

export const { toggleUser, setConversation, setMessages, toggleRefresh, unsetSelectedUser } = conversationSlice.actions;

export default conversationSlice.reducer;