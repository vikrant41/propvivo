import { RootState } from "..";
import {authApi} from "../../slices/auth";
import { createSlice } from "@reduxjs/toolkit";
import UseStorage from "../../lib/useStorage"
//import { clearLocalStorage, setLocalUser } from "../../storage";
import {AuthUser} from "../type";


const INITIAL_STATE: AuthUser & { loginError?: string; } =
  {};

const storage = UseStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loadLocalUser: (_state, action) => {
      return action.payload;
    },
    selectProject: (state, action) => {
      const newState = { ...state, currentProject: action.payload };
      //setLocalUser(newState);
      storage.setItem("authuser", JSON.stringify(newState))
      return newState;
    },
    logout: () => {
      //clearLocalStorage();
      storage.removeItem("authuser")
      storage.setItem("authuser", JSON.stringify(INITIAL_STATE))
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
      if (action.payload) {
        storage.setItem("authuser", JSON.stringify(action.payload))
        return { ...state, ...action.payload };
      } else {
        return { ...state, loginError: "login-error" };
      }
    });
  },
});

export const selectCurrentUser = (
  state: RootState
): AuthUser & { loginError?: string } => state.auth;

export const selectLoginErrorMessage = (state: RootState) =>
  state.auth.loginError;

export const { loadLocalUser, selectProject, logout } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
