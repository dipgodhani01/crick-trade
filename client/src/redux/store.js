import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import auctionReducer from "./slice/auctionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auction:auctionReducer
  },
});

export default store;
