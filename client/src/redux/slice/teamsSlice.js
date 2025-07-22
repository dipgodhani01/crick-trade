import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTeamsApi, deleteTeam, getAllTeamsApi } from "../../utils/api";
import { toast } from "react-toastify";
import { getUsersAuction } from "./auctionSlice";

export const createTeams = createAsyncThunk(
  "teams/createTeams",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createTeamsApi(formData);
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
export const getAllTeams = createAsyncThunk(
  "teams/getAllTeams",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getAllTeamsApi(auctionId);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteTeamById = createAsyncThunk(
  "teams/deleteTeamById",
  async ({ aucId, teamId }, { rejectWithValue, dispatch }) => {
    console.log(aucId,teamId);
    
    try {
      const response = await deleteTeam(aucId, teamId);
      dispatch(getAllTeams(aucId));
      toast.success("Team deleted successfully");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    loading: false,
    error: null,
    teams: [],
    selectedTeam: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeams.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTeamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeamById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const teamsReducer = teamsSlice.reducer;
export default teamsReducer;
