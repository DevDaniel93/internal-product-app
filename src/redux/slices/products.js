import { createSlice } from '@reduxjs/toolkit';
import { Getproducts } from '../service/products.service';
import { setLoading } from './utils';


const initialState = {
    products: [],

};

export const getProducts = (params) => async (dispatch) => {
    try {

        await Getproducts(params).then(async (response) => {
            dispatch(saveProducts(response))
        }).catch((error) => {
            console.log("error===========>", error?.response?.data?.message)
        })

    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        saveProducts: (state, action) => {
            state.products = action.payload
        },



    },
});

export const { saveProducts } = ProductSlice.actions;

export default ProductSlice.reducer;