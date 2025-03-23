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
      // ตรวจสอบการจองสถานที่เดียวกันและวันเดียวกัน
      const existingReservationIndex = state.reserveItems.findIndex(
        (item) =>
          item.massageshop === action.payload.massageshop && item.reserveDate === action.payload.reserveDate
      );

      if (existingReservationIndex !== -1) {
        // ถ้ามีการจองในสถานที่เดียวกันและวันเดียวกัน ให้แทนที่ข้อมูลเดิม
        state.reserveItems[existingReservationIndex] = action.payload;
      } else {
        // ถ้าไม่พบ ให้เพิ่มข้อมูลการจองใหม่
        state.reserveItems.push(action.payload);
      }
    },
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      // ลบการจองโดยใช้ข้อมูลชื่อ, เบอร์โทร, สถานที่ และวัน
      state.reserveItems = state.reserveItems.filter(
        (item) =>
          !(item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.massageshop === action.payload.massageshop &&
            item.reserveDate === action.payload.reserveDate)
      );
    },
    clearReservations: (state) => {
      // เคลียร์รายการการจองทั้งหมด
      state.reserveItems = [];
    },
  },
});

export const { addReservation, removeReservation, clearReservations } = reserveSlice.actions;
export default reserveSlice.reducer;
