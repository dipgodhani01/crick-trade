import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import auctionReducer from "./slice/auctionSlice";
import layoutReducer from "./slice/layoutSlice";
import teamsReducer from "./slice/teamsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    sidebar: layoutReducer,
    teams: teamsReducer,
  },
});

export default store;
