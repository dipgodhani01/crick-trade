import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAuc, getAuctions } from "../../utils/api";
import { toast } from "react-toastify";

export const createAuction = createAsyncThunk(
  "auction/createAuction",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createAuc(formData);
      const userId = getState().user.user._id;

      dispatch(getUsersAuction(userId));
      
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const getUsersAuction = createAsyncThunk(
  "auction/getUsersAuction",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getAuctions(userId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    error: null,
    auctions: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUsersAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAuction.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(getUsersAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
