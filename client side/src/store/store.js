import { packageSlice } from "../features/package/packageSlice";
import storage from 'redux-persist/lib/storage'
import { purchaseSlice } from '../features/purchase/purchaseSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import {lessonSlice} from "../features/lesson/lessonSlice"
import {rentalSlice} from "../features/rental/rentalSlice"



const rootReducer = combineReducers({
    user: userSlice.reducer,
    package: packageSlice.reducer,
    purchase: purchaseSlice.reducer,
    lesson: lessonSlice.reducer,
    rental: rentalSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export const RootState = store.getState
export const AppDidpatch = store.dispatch