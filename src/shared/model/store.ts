import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { tableSlice } from "./slices";
import { tableMenuSlice } from "./slices";
import { userInfoSlice } from "./slices";

export const templateSlice = createSlice({
  name: "template",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
    tableMenu: tableMenuSlice.reducer,
    userInfo: userInfoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
