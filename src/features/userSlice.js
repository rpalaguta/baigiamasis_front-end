import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value= false
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer;