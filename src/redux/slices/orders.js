import { createSlice } from '@reduxjs/toolkit';
import { GetOrders, GetSingleOrderDetail, PostOrder } from '../service/orders.service';
import { ErrorAlert, SuccessAlert } from '../../utils/utils';




const initialState = {
    Orders: [],
    orderDetail: null,
    orderResponse: null,

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
// export const postOrder = (params) => async (dispatch) => {
//     try {
//         const response = await PostOrder(params)
//         return response

//         //   .then(async (response) => {
//         //         SuccessAlert("Order Posted Successfully")
//         //         return response
//         //         dispatch(saveOrderResponse(response))
//         //     }).catch((error) => {
//         //         console.log("error===========>", error)
//         //     })
//     } catch (error) {
//         console.log("error===========>", error)
//     };
// };

export const postOrder = (params) => async (dispatch) => {
    try {
        const response = await PostOrder(params);
        return response;
    } catch (error) {
        console.log("Order Posted error===========>", error?.response?.data?.message);
        ErrorAlert(error);
        throw error;
        // Optionally, you could dispatch an error action here
        // dispatch(saveOrderError(error));
    }
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
        saveOrderResponse: (state, action) => {
            state.orderResponse = action.payload
        }




    },
});

export const { saveOrders, saveOrdersDetail, saveOrderResponse } = OrderSlice.actions;

export default OrderSlice.reducer;