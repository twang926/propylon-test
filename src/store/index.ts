import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tocSlice from "./toc-slice";
import type { PreloadedState } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: { toc: tocSlice.reducer },
});

// jest testing
// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  toc: tocSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
