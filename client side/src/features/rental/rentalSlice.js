import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getRentals,updateRental} from '../../services/rental'

const initialState = {
    rentals: [],
    error: null,
    loading: false
}

export const fetchGetRentals = createAsyncThunk(
    'rental/get',
    async (_, thunkAPI) => {
        try {
            const res = await getRentals();// שם העמוד.שם הפו ליבא את הפונ מהסרויס
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data );
        }
    }
)

export const fetchUpdateRental = createAsyncThunk(
    'rental/update',
    async (rentalId,rental) => {
        try {
            const res = await updateRental(rentalId,rental);// שם העמוד.שם הפו ליבא את הפונ מהסרויס
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data );
        }
    }
)



export const rentalSlice = createSlice({
    name: 'rental',
    initialState,
    //מה צריך לעשות כאן
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchGetRentals.fulfilled, (state, action) => {
            state.rentals = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchGetRentals.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchGetRentals.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
        builder.addCase(fetchUpdateRental.fulfilled, (state, action) => {
            state.rentals = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUpdateRental.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUpdateRental.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })

    }
})


