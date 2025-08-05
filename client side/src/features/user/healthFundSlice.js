import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHealthFunds, getHealthFundById, addHealthFund, updateHealthFund, deleteHealthFund } from "../../services/healthfund";
const initialState = {
    healthFunds: [],
    selectedHealthFund: null,
    loading: false,
    error: null
};

// --------- Thunks ---------

export const fetchHealthFunds = createAsyncThunk(
    'healthFund/fetchHealthFunds',
    async () => {
        const response = await getHealthFunds();
        return response.data;
    }
);

export const fetchHealthFundById = createAsyncThunk(
    'healthFund/fetchHealthFundById',
    async (id) => {
        const response = await getHealthFundById(id);
        return response.data;
    }
);

export const fetchAddHealthFund = createAsyncThunk(
    'healthFund/fetchAddHealthFund',
    async (healthFund) => {
        const response = await addHealthFund(healthFund);
        return response.data;
    }
);

export const fetchUpdateHealthFund = createAsyncThunk(
    'healthFund/fetchUpdateHealthFund',
    async ({ id, healthFund }) => {
        const response = await updateHealthFund(id, healthFund);
        return response.data;
    }
);

export const fetchDeleteHealthFund = createAsyncThunk(
    'healthFund/fetchDeleteHealthFund',
    async (id) => {
        await deleteHealthFund(id);
        return id;
    }
);

// --------- Slice ---------

export const healthFundSlice = createSlice({
    name: 'healthFund',
    initialState,
    reducers: {
        clearSelectedHealthFund(state) {
            state.selectedHealthFund = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All
            .addCase(fetchHealthFunds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHealthFunds.fulfilled, (state, action) => {
                state.healthFunds = action.payload;
                state.loading = false;
            })
            .addCase(fetchHealthFunds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get By ID
            .addCase(fetchHealthFundById.fulfilled, (state, action) => {
                state.selectedHealthFund = action.payload;
            })

            // Add
            .addCase(fetchAddHealthFund.fulfilled, (state, action) => {
                state.healthFunds.push(action.payload);
            })

            // Update
            .addCase(fetchUpdateHealthFund.fulfilled, (state, action) => {
                const index = state.healthFunds.findIndex(h => h.code === action.payload.code);
                if (index !== -1) state.healthFunds[index] = action.payload;
            })

            // Delete
            .addCase(fetchDeleteHealthFund.fulfilled, (state, action) => {
                state.healthFunds = state.healthFunds.filter(h => h.code !== action.payload);
            });
    }
});

export const { clearSelectedHealthFund } = healthFundSlice.actions;

export default healthFundSlice.reducer;
