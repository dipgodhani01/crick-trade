import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPlayersApi,
  deletePlayer,
  getAllPlayersApi,
  getPendingPlayersApi,
  getPlayerByIdApi,
  updatePlayerApi,
  updatePlayerBasePriceApi,
} from "../../utils/api";
import { toast } from "react-toastify";
import { getUsersAuction } from "./auctionSlice";

export const createPlayers = createAsyncThunk(
  "players/createPlayers",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createPlayersApi(formData);
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

export const getAllPlayers = createAsyncThunk(
  "players/getAllPlayers",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getAllPlayersApi(auctionId);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deletePlayerById = createAsyncThunk(
  "players/deletePlayerById",
  async ({ aucId, playerId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await deletePlayer(aucId, playerId);
      dispatch(getAllPlayers(aucId));
      toast.success("Team deleted successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getPlayerById = createAsyncThunk(
  "players/getPlayerById",
  async ({ auctionId, playerId }, { rejectWithValue }) => {
    try {
      const response = await getPlayerByIdApi(auctionId, playerId);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updatePlayerApi(formData);
      toast.success("Player updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updatePlayerBasePrice = createAsyncThunk(
  "players/updatePlayerBasePrice",
  async (
    { minimumBid, playerId, auctionId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await updatePlayerBasePriceApi({
        minimumBid,
        playerId,
        auctionId,
      });
      dispatch(getAllPlayers(auctionId));
      toast.success("Player base-price updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getPendingPlayers = createAsyncThunk(
  "players/getPendingPlayers",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getPendingPlayersApi(auctionId);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState: {
    loading: false,
    error: null,
    players: [],
    selectedPlayer: null,
    pending: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlayers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(getAllPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePlayerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlayerById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPlayerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(getPlayerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlayer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePlayerBasePrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlayerBasePrice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePlayerBasePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPendingPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload;
      })
      .addCase(getPendingPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const playersReducer = playerSlice.reducer;
export default playersReducer;
