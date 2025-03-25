import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interface";

// 🏪 ประเภทของร้านนวด
type MassageshopItem = {
  name: string;
  openclosetime: { open: string; close: string };
};

// 🏷️ กำหนด State ของ Redux
type ReserveState = {
  reserveItems: ReservationItem[];
  massageshopItems: MassageshopItem[]; // ✅ เพิ่มร้านนวดลงใน state
};

const initialState: ReserveState = { 
  reserveItems: [], 
  massageshopItems: [] // ✅ ค่าเริ่มต้นเป็น array ว่าง
};

export const reserveSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {

    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const { venue, bookDate, startTime, endTime, nameLastname, tel } = action.payload;

      // 🚀 ค้นหาร้านนวดที่ตรงกับ `venue`
      const massageshopItem = state.massageshopItems.find(
        (item) => item.name === venue
      );

      if (!massageshopItem) {
        console.error("❌ ไม่พบข้อมูลร้านนี้");
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

    updateReservation(state, action: PayloadAction<ReservationItem>) {
      const index = state.reserveItems.findIndex(
        (reservation) => reservation.id === action.payload.id
      );
      if (index !== -1) {
        state.reserveItems[index] = action.payload;
      }
    },

    setReservations: (state, action) => {
      state.reserveItems = action.payload;
    }, 
    editReservation: (state, action: PayloadAction<ReservationItem>) => {
      const updated = action.payload;
      const index = state.reserveItems.findIndex(
        (item) => item.id === updated.id
      );
    
      if (index !== -1) {
        state.reserveItems[index] = updated;
      }
    }   
  },
});

export const { addReservation, removeReservation, clearReservations, setReservations,  updateReservation, editReservation} = reserveSlice.actions;
export default reserveSlice.reducer;