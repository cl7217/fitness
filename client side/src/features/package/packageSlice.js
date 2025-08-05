import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPackages } from "../../services/package";

const initialState = {
    packages: [],
    error: null,
    loading: false
}

export const fetchGetPackages = createAsyncThunk(
    'Package/get',
    async () => {
        const res = await getPackages();
        console.log(res.data);
        return res.data;
    }
)


export const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // getPackages
        builder.addCase(fetchGetPackages.fulfilled, (state, action) => {
            state.packages = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchGetPackages.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchGetPackages.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })

    }
})


