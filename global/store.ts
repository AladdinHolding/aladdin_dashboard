import {configureStore} from "@reduxjs/toolkit";
import { blogsApi } from "./api/blogsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./api/categoryApi";
import { testApi } from "./api/testApi";

export const store = configureStore({
    reducer: {[blogsApi.reducerPath]:blogsApi.reducer, [categoryApi.reducerPath]:categoryApi.reducer, [testApi.reducerPath]:testApi.reducer},
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat([
            blogsApi.middleware,
            categoryApi.middleware,
            testApi.middleware
        ])
    }
});

setupListeners(store.dispatch);
