import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "constructor" | "writer" | "reader";

export type UserInfo = {
  email: string;
  name: string;
};

type State = {
  user: null | UserInfo;
};

const initialState: State = { user: null };

export const userInfoSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
      state.user = payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
