import { createSlice } from '@reduxjs/toolkit';
import { GetOrders, GetSingleOrderDetail } from '../service/orders.service';




const initialState = {
    Orders: [],
    orderDetail: null

};

export const getOrder = (params) => async (dispatch) => {
    try {
        await GetOrders(params).then(async (response) => {
            dispatch(saveOrders(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })
    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getSingleOrder = (id) => async (dispatch) => {
    try {
        await GetSingleOrderDetail(id).then(async (response) => {
            dispatch(saveOrdersDetail(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        saveOrders: (state, action) => {
            state.Orders = action.payload
        },
        saveOrdersDetail: (state, action) => {
            state.orderDetail = action.payload
        },



    },
});

export const { saveOrders } = OrderSlice.actions;

export default OrderSlice.reducer;