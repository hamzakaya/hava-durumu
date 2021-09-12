import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./reducers/app";
import havaDurumu from "./reducers/havaDurumu";


const store = configureStore({
  reducer: {
    app: appReducer,
    data: havaDurumu,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export default store;
