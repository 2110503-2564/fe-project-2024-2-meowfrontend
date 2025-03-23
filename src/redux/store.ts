import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { bookSlice } from "./features/bookSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

// สร้าง storage ที่ใช้ในฝั่ง Client (localStorage)
function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage('local');
}

const storage = createPersistStorage();

// ตั้งค่า Redux Persist
const persistConfig = {
  key: "rootPersist",
  storage,
};

const rootReducer = combineReducers({
  bookSlice: bookSlice.reducer,
});

// ใช้ persistReducer เพื่อเก็บข้อมูล Redux ด้วย redux-persist
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer);

// สร้าง Redux store พร้อมการตั้งค่าด้วย redux-persist
export const store = configureStore({
  reducer: reduxPersistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
