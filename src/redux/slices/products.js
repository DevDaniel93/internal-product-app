import { createSlice } from '@reduxjs/toolkit';
import { Getproducts } from '../service/products.service';
import { getCategories } from './categories';



const initialState = {
    products: [],
    filterProduct: []

};

export const getProducts = (page, params) => async (dispatch) => {
    try {

        await Getproducts(page, params).then(async (response) => {
            await dispatch(getCategories())
            // dispatch(saveProducts(response))
            dispatch(saveProducts(response))
        }).catch((error) => {
            console.log("error===========>", error)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};
export const getFilterProducts = (page, params) => async (dispatch) => {
    try {

        await Getproducts(page, params).then(async (response) => {

            // dispatch(saveFilterProduct(response))
            dispatch(saveProducts(response))
    
        }).catch((error) => {
            console.log("error===========>", error)
        })


    } catch (error) {
        console.log("error===========>", error)
    };
};



export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // saveProducts: (state, action) => {
        //     state.products = [...state.products, ...action.payload];
        // },
        saveProducts: (state, action) => {
            const newProducts = action.payload.filter(newProduct =>
                !state.products.some(existingProduct => existingProduct.id === newProduct.id)
            );
            state.products = [...state.products, ...newProducts];
        },
        saveFilterProduct: (state, action) => {
            state.filterProduct = action.payload;
        },



    },
});

export const { saveProducts, saveFilterProduct } = ProductSlice.actions;

export default ProductSlice.reducer;