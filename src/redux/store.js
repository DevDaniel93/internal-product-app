import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserTypeReducer from './slices/userType';
import CartReducer from './slices/Cart';
import ThemeReducer from './slices/theme';
import AuthReducer from './slices/auth';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

};

const rootReducer = combineReducers({
    Theme: ThemeReducer,
    Cart: CartReducer,
    Auth: AuthReducer,
    UserType: UserTypeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
});

export const persistor = persistStore(store);