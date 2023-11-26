import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {value:{
    id: "0",
    username: ""
}}
const initialChatState = {value: {
    id: "0",
    user1Id: "0",
    user2Id: "0"
}}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.value = action.payload;
        },

        logoutUser: (state) => {
            state.value = initialState.value;
        }
    }
})
const contatcSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContact: (state, action) => {
            state.value = action.payload
        },

        resetContact: (state) => {
            state.value = initialState.value
        }
    }
})
const chatSlice = createSlice({
    name: "chat",
    initialState: {value: {
        id: "",
        user1Id: "0",
        user2Id: "0"
    }},
    reducers: {
        setChat: (state, action) => {
            state.value = action.payload
        },

        resetChat: (state) => {
            state.value = {value: {
                id: "",
                user1Id: "0",
                user2Id: "0"
            }}
        }
    }

})

export const {loginUser, logoutUser} = userSlice.actions;
export const {setContact, resetContact} = contatcSlice.actions;
export const {setChat, resetChat} = chatSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        contact: contatcSlice.reducer,
        chat: chatSlice.reducer
    }
});