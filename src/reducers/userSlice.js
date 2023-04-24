import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { deleteUser, getAllUsers, createUser } from './../services/blogsServices';
import { apiSlice } from './../api/apiSlice';


const userAdaptor = createEntityAdapter();

const initialState = userAdaptor.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers : builder.query ({
            query : () => "/users",
            transformResponse: responseData => {
                return userAdaptor.setAll(initialState, responseData);
            },
            providesTags:["USER"]
        }),
        addNewUser:builder.mutation({
            query: (user) => ({
                url:"/users",
                method:'POST',
                body: user
            }),
            transformResponse:responseData => {
                return userAdaptor.setAll(initialState,responseData)
            },
            invalidatesTags:["USER"]
        }),
        deleteUser: builder.mutation({
            query:(userId) => ({
                url:`/users/${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["USER"]
        })
    })
})

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();




const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
})


const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll:selectAllUsers,
    selectById:selectUserById,
} = userAdaptor.getSelectors(state => selectUsersData(state))

export const {useGetUsersQuery,useAddNewUserMutation,useDeleteUserMutation} = extendedApiSlice;

export default userSlice.reducer;