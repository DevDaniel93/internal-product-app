import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeReducer from './slices/userType';
import CartReducer from './slices/Cart';
import ThemeReducer from './slices/theme';
import utilsReducer from './slices/utils';
import AuthReducer from './slices/auth';
import ProductReducer from './slices/products';
import CategoryReducer from './slices/categories';
import OrderReducer from './slices/orders';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

};

const rootReducer = combineReducers({
    Theme: ThemeReducer,
    utils: utilsReducer,
    Cart: CartReducer,
    Auth: AuthReducer,
    UserType: UserTypeReducer,
    Product: ProductReducer,
    categories: CategoryReducer,
    Orders: OrderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
});

export const persistor = persistStore(store);