import { createSlice } from '@reduxjs/toolkit';
import { GetVoucher } from '../service/vouchers.service';



const initialState = {
    vouchers: [],

};

export const getVoucher = (params) => async (dispatch) => {
    try {

        await GetVoucher(params).then(async (response) => {
            dispatch(saveVoucher(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};



export const VoucherSlice = createSlice({
    name: 'vouchers',
    initialState,
    reducers: {
        saveVoucher: (state, action) => {
            state.vouchers = action.payload
        },



    },
});

export const { saveVoucher } = VoucherSlice.actions;

export default VoucherSlice.reducer;