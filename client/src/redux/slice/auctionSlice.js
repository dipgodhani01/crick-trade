import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAuc,
  deleteAuction,
  getAuctions,
  getSingleAuction,
  updateAuctionApi,
} from "../../utils/api";
import { toast } from "react-toastify";

export const createAuction = createAsyncThunk(
  "auction/createAuction",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createAuc(formData);
      const userId = getState().user.user._id;
      dispatch(getUsersAuction(userId));

      toast.success(response?.data?.message);
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

export const getAuctionById = createAsyncThunk(
  "auction/getAuctionById",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getSingleAuction(auctionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateAuction = createAsyncThunk(
  "auction/updateAuction",
  async ({ auctionId, formData }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await updateAuctionApi(auctionId, formData);
      const userId = getState().user.user._id;
      dispatch(getUsersAuction(userId));
      toast.success("Auction updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteAuctionById = createAsyncThunk(
  "auction/deleteAuctionById",
  async (auctionId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await deleteAuction(auctionId);
      const userId = getState().user.user._id;
      dispatch(getUsersAuction(userId));

      toast.success("Auction deleted successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    error: null,
    auctions: [],
    selectedAuction: null,
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
      })
      .addCase(getAuctionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuctionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAuction = action.payload;
      })
      .addCase(getAuctionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAuction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAuction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAuctionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAuctionById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAuctionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
