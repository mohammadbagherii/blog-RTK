import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';

import userReduser from '../reducers/userSlice';
import { apiSlice } from './../api/apiSlice';

export const store = configureStore({
    reducer:{
        users:userReduser,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

store.dispatch(apiSlice.endpoints.getUsers.initiate())