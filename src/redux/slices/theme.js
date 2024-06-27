import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'Light'
    },
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload
        },


    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;