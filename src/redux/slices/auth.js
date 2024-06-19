import { createSlice } from '@reduxjs/toolkit';
import authService from '../service/auth.service';

const initialState = {
    token: null,
    user: null
};

export const login = ({ email, password }) => async (dispatch) => {
    try {
        await authService.login({ email, password }).then(async (response) => {
            getProfile(response?.token)
        }).catch((error) => {

            console.log("error===========>", error)
        });


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getProfile = (token) => async (dispatch) => {
    try {
        await authService.getProfile(token).then(async (response) => {

        }).catch((error) => {

            console.log("error", error)
        });


    } catch (error) {
        console.log("error===========>", error)
    };
};

export const logout = () => async (dispatch) => {
    try {
        dispatch(removeProfile())
        dispatch(removeAccessToken())

    } catch (error) {
        console.log("error===========>", error)
    }
};


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveAccessToken: (state, action) => {
            state.token = action.payload
        },
        removeAccessToken: (state, action) => {
            state.token = null
        },
        saveProfile: (state, action) => {
            state.user = action.payload
        },
        removeProfile: (state, action) => {
            state.user = null
        },


    },
});

export const { saveAccessToken, removeAccessToken, saveProfile, removeProfile } = AuthSlice.actions;

export default AuthSlice.reducer;