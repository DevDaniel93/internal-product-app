import { createSlice } from '@reduxjs/toolkit';
import { GetCountries } from '../service/shipping.service';



const initialState = {
    countries: [],

};

export const getCountries = (params) => async (dispatch) => {
    try {

        await GetCountries(params).then(async (response) => {

            dispatch(saveCountries(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ShippingSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        saveCountries: (state, action) => {
            state.countries = action.payload
        },



    },
});

export const { saveCountries } = ShippingSlice.actions;

export default ShippingSlice.reducer;