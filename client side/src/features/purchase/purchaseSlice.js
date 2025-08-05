import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPurchasesByUserId ,addPurchase } from "../../services/purchase";

const initialState = {
    purchases: [],
    error: null,
    loading: false
}

export const fetchHistory = createAsyncThunk(
    'Purchase/getByUserId',
    async (user) => {
        const res = await getPurchasesByUserId(user)
        return res.data;
    }
)

export const fetchAddPurchase = createAsyncThunk(
    'Purchase/add',
    async (purchase) => {
        try {
            const res = await addPurchase(purchase);
            console.log("res slice",res.data)
            return res.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.res?.data )
        }
    }
)



export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,

    reducers: {
        addDemoPurchase: (state) => {
            const demoPurchases = [
                {
                    id: Date.now(),
                    code: `PUR-${Date.now()}`,
                    date: new Date().toISOString(),
                    pointsBalance: 100,
                    lessonName: "יוגה מתחילים",
                    instructorName: "שרה כהן",
                    status: "completed"
                },
                {
                    id: Date.now() + 1,
                    code: `PUR-${Date.now() + 1}`,
                    date: new Date(Date.now() - 86400000).toISOString(), // יום קודם
                    pointsBalance: 150,
                    lessonName: "פילאטיס מתקדמים",
                    instructorName: "דוד לוי",
                    status: "completed"
                },
                {
                    id: Date.now() + 2,
                    code: `PUR-${Date.now() + 2}`,
                    date: new Date(Date.now() - 172800000).toISOString(), // יומיים קודם
                    pointsBalance: 80,
                    lessonName: "זומבה",
                    instructorName: "מיכל אברהם",
                    status: "upcoming"
                }
            ];
            state.purchases.push(...demoPurchases);
        },
        clearPurchases: (state) => {
            state.purchases = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistory.fulfilled, (state, action) => {
            state.purchases = action.payload
            state.loading = false
        })
        builder.addCase(fetchHistory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchHistory.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to fetch purchases'
            state.loading = false
        })


        // builder.addCase(fetchAddPurchase.fulfilled,(state,action)=>{
        //     state.data=action.payload
        //     state.loading=false
        // })
        // builder.addCase(fetchAddPurchase.pending,(state)=>{
        //     state.loading=true
        // })
        // builder.addCase(fetchAddPurchase.rejected,(state,action)=>{
        //     state.error=action=action.error
        //     state.loading=false;
        // })

    }
})

export const { addDemoPurchase, clearPurchases } = purchaseSlice.actions
export default purchaseSlice.reducer