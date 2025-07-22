import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import auctionReducer from "./slice/auctionSlice";
import layoutReducer from "./slice/layoutSlice";
import teamsReducer from "./slice/teamsSlice";
import playersReducer from "./slice/playerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    sidebar: layoutReducer,
    teams: teamsReducer,
    players: playersReducer,
  },
});

export default store;
