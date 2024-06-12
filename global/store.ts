import {configureStore} from "@reduxjs/toolkit";
import { blogsApi } from "./api/blogsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./api/categoryApi";
import { testApi } from "./api/testApi";
import logger from 'redux-logger';

export const store = configureStore({
    reducer: { [categoryApi.reducerPath]:categoryApi.reducer, [testApi.reducerPath]:testApi.reducer,[blogsApi.reducerPath]:blogsApi.reducer,},
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat([
            blogsApi.middleware,
            categoryApi.middleware,
            testApi.middleware
        ])
    }
});

setupListeners(store.dispatch);
