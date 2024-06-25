import {configureStore} from "@reduxjs/toolkit";
import { blogsApi } from "./api/blogsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./api/categoryApi";
import { testApi } from "./api/testApi";
import logger from 'redux-logger';
import { authApi } from "./api/authApi";

export const store = configureStore({
    reducer: { [categoryApi.reducerPath]:categoryApi.reducer, [testApi.reducerPath]:testApi.reducer,[blogsApi.reducerPath]:blogsApi.reducer,[authApi.reducerPath]:authApi.reducer},
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat([
            blogsApi.middleware,
            categoryApi.middleware,
            authApi.middleware,
            testApi.middleware
        ])
    }
});

setupListeners(store.dispatch);
