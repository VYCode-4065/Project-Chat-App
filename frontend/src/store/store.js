import { configureStore } from '@reduxjs/toolkit'
import conversation from './conversationSlice.js';
import loggedInUserDetails from './userDetailSlice.js'


const conversationStore = configureStore({
    reducer: {
        conversationDetails: conversation,
        loggedInUserDetails: loggedInUserDetails
    },
})
export default conversationStore;