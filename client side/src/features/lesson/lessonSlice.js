import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLessons } from "../../services/lesson";

const initialState = {
    lessons: [],
    error: null,
    loading: false
}

export const fetchGetLessons = createAsyncThunk(
    'Package/get',
    async (_, thunkAPI) => {
        try {
            const res = await getLessons();// שם העמוד.שם הפו ליבא את הפונ מהסרויס
            console.log("res in slice",res.data);
            
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
)


export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    //מה צריך לעשות כאן
    reducers: {

    },
    extraReducers: (builder) => {
        // getPackages
        builder.addCase(fetchGetLessons.fulfilled, (state, action) => {
            state.lessons = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchGetLessons.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchGetLessons.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })

    }
})


