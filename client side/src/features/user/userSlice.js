import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, updateUser } from "../../services/user";

const initialState = {
    currentUser: {},
    loading: false,
    error: null
}

export const fetchSignIn = createAsyncThunk(
    'users/fetchSignIn',
    async (user) => {
        const userIn = await signIn(user)
        return userIn
    }
)

export const fetchSignUp = createAsyncThunk(
    'users/fetchSignUp',
    async (user) => {
        const userUp = await signUp(user)
        return userUp
    }
)

export const fetchUpdate = createAsyncThunk(
    'users/fetchUpdate',
    async (id, user) => {
        const updateUser = await updateUser(id, user);
        return updateUser;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentUser(state) {
            return state.user
        },
        signOut(state) {
            state.currentUser = {};
            state.loading = false;
            state.error = null;
        },
        updateUserPoints(state, action) {
            if (state.currentUser) {
                state.currentUser.pointsBalance = action.payload;
            }
        },
        deductPoints(state, action) {
            if (state.currentUser && state.currentUser.pointsBalance) {
                state.currentUser.pointsBalance -= action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        //fetchSignIn
        builder.addCase(fetchSignIn.fulfilled, (state, action) => {
            state.currentUser = action.payload.data
            state.loading = false
        })
        builder.addCase(fetchSignIn.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSignIn.rejected, (state, action) => {
            state.error = action.error.message || '';
        })
        //fetchSignUp
        builder.addCase(fetchSignUp.fulfilled, (state, action) => {
            state.currentUser = action.payload.data
        })
        builder.addCase(fetchSignUp.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSignUp.rejected, (state, action) => {
            state.error = action.error.message || '';
        })
        //fetchUpdate
        builder.addCase(fetchUpdate.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(fetchUpdate.rejected, (state, action) => {
            state.error = action.error.message || '';
        });
    }
})
export const { getCurrentUser, signOut, updateUserPoints, deductPoints } = userSlice.actions;
// export default userSlice.reducer;