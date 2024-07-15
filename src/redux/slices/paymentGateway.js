import { createSlice } from '@reduxjs/toolkit';
import { GetPayment } from '../service/paymentGateway.service';



const initialState = {
    payment: [],

};

export const getPayment = (params) => async (dispatch) => {
    try {

        await GetPayment(params).then(async (response) => {
            const filterPayment = response.filter(items => items.enabled === true && items.title !== 'Link');
            dispatch(savePayment(filterPayment))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const PaymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        savePayment: (state, action) => {
            state.payment = action.payload
        },



    },
});

export const { savePayment } = PaymentSlice.actions;

export default PaymentSlice.reducer;