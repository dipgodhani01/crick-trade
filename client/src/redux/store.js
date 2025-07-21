import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import auctionReducer from "./slice/auctionSlice";
import layoutReducer from "./slice/layoutSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    sidebar: layoutReducer,
  },
});

export default store;
