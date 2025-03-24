
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem, MassageshopItem } from "../../../interface";

// กำหนดประเภทของ state
type ReservationState = {
  reserveItems: ReservationItem[];
  massageshopItems: MassageshopItem[];
};

// กำหนดค่าเริ่มต้นของ state
const initialState: ReservationState = { 
  reserveItems: [],
  massageshopItems: []
};

// สร้าง slice
export const reserveSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // ตั้งค่า venueItems
    setReservationItems: (state, action: PayloadAction<MassageshopItem[]>) => {
      state.massageshopItems = action.payload;
    },

    // เพิ่มการจอง
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const { venue, bookDate, startTime, endTime, nameLastname, tel } = action.payload;

      // ตรวจสอบข้อมูลการจอง
      if (!nameLastname || !tel || !venue || !bookDate || !startTime || !endTime) {
        alert("ข้อมูลการจองไม่ครบถ้วน");
        return;
      }

      // ตรวจสอบข้อมูลร้าน
      if (!state.massageshopItems || state.massageshopItems.length === 0) {
        alert("ไม่พบข้อมูลร้าน");
        return;
      }

      // ค้นหาข้อมูลร้าน
      const massageshopItem = Array.isArray(state.massageshopItems) 
      ? state.massageshopItems.find((item) => item.name === venue) 
      : undefined;
            if (!massageshopItem) {
        alert("ไม่พบข้อมูลร้านนี้");
        return;
      }

      // ตรวจสอบรูปแบบเวลา
      const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const { open, close } =  massageshopItem.openclosetime;
      if (!timePattern.test(open) || !timePattern.test(close) || !timePattern.test(startTime) || !timePattern.test(endTime)) {
        alert("รูปแบบเวลาไม่ถูกต้อง");
        return;
      }

      // แปลงเวลา
      const openTime = new Date(`1970-01-01T${open}:00`);
      const closeTime = new Date(`1970-01-01T${close}:00`);
      const startBookingTime = new Date(`1970-01-01T${startTime}:00`);
      const endBookingTime = new Date(`1970-01-01T${endTime}:00`);

      // ตรวจสอบเวลาเปิด-ปิด
      if (startBookingTime < openTime || endBookingTime > closeTime) {
        alert(`เวลาจองต้องอยู่ภายในช่วงเวลาเปิด-ปิดของร้าน (${open} - ${close})`);
        return;
      }

      // ตรวจสอบการจองเดิม
      const existingBookingIndex = state. reserveItems.findIndex(
        (item) => item.venue === venue && item.bookDate === bookDate
      );

      if (existingBookingIndex !== -1) {
        alert("การจองเดิมจะถูกแทนที่ด้วยข้อมูลใหม่");
        state.reserveItems[existingBookingIndex] = action.payload;
      } else {
        // ตรวจสอบว่ามีการจองเกิน 3 ครั้งหรือไม่
        if (state.reserveItems.length >= 3) {
          alert("คุณไม่สามารถจองได้มากกว่า 3 ครั้ง");
          return;
        }
        // เพิ่มการจองใหม่
        state.reserveItems.push(action.payload);
      }
    },

    // ลบการจอง
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      state.reserveItems = state.reserveItems.filter(
        (item) =>
          !(item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate)
      );
    },

    // เคลียร์การจองทั้งหมด
    clearReservations: (state) => {
      state.reserveItems = [];
    },
  },
});

// ส่งออก actions
export const { addReservation, removeReservation, clearReservations, setReservationItems } = reserveSlice.actions;

// ส่งออก reducer
export default reserveSlice.reducer;

