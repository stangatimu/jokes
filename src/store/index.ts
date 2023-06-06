import { APIService } from "@/services";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [APIService.reducerPath]: APIService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APIService.middleware),
});

setupListeners(store.dispatch);
