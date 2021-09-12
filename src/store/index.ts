import { configureStore } from '@reduxjs/toolkit';
import appReducer from "./reducers/app";
import havadurumu from "./reducers/havadurumu";


const store = configureStore({
  reducer: {
    app: appReducer,
    data: havadurumu,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export default store;
