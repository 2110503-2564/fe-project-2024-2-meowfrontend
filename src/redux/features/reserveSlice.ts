import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interface";

type ReserveState = {
  reserveItems: ReservationItem[];
};

const initialState: ReserveState = { reserveItems: [] };

export const reserveSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const existingReservationIndex = state.reserveItems.findIndex(
        (item) =>
          item.venue === action.payload.venue && item.bookDate === action.payload.bookDate
      );

      if (existingReservationIndex !== -1) {
        state.reserveItems[existingReservationIndex] = action.payload;
      } else {
        state.reserveItems.push(action.payload);
      }
    },
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      state.reserveItems = state.reserveItems.filter(
        (item) =>
          !(item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate)
      );
    },
    clearReservations: (state) => {
      state.reserveItems = [];
    },
  },
});

export const { addReservation, removeReservation, clearReservations } = reserveSlice.actions;
export default reserveSlice.reducer;
