import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem, VenueItem } from "../../../interface";

// กำหนดประเภทของ state
type BookState = {
  bookItems: BookingItem[];
  venueItems: VenueItem[];
};

// กำหนดค่าเริ่มต้นของ state
const initialState: BookState = { 
  bookItems: [],
  venueItems: []
};

// สร้าง slice
export const bookSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // ตั้งค่า venueItems
    setVenueItems: (state, action: PayloadAction<VenueItem[]>) => {
      state.venueItems = action.payload;
    },

    // เพิ่มการจอง
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const { venue, bookDate, startTime, endTime, nameLastname, tel } = action.payload;

      // ตรวจสอบข้อมูลการจอง
      if (!nameLastname || !tel || !venue || !bookDate || !startTime || !endTime) {
        alert("ข้อมูลการจองไม่ครบถ้วน");
        return;
      }

      // ตรวจสอบข้อมูลร้าน
      if (!state.venueItems || state.venueItems.length === 0) {
        alert("ไม่พบข้อมูลร้าน");
        return;
      }

      // ค้นหาข้อมูลร้าน
      const venueItem = Array.isArray(state.venueItems) 
      ? state.venueItems.find((item) => item.name === venue) 
      : undefined;
            if (!venueItem) {
        alert("ไม่พบข้อมูลร้านนี้");
        return;
      }

      // ตรวจสอบรูปแบบเวลา
      const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const { open, close } = venueItem.openclosetime;
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
      const existingBookingIndex = state.bookItems.findIndex(
        (item) => item.venue === venue && item.bookDate === bookDate
      );

      if (existingBookingIndex !== -1) {
        alert("การจองเดิมจะถูกแทนที่ด้วยข้อมูลใหม่");
        state.bookItems[existingBookingIndex] = action.payload;
      } else {
        // ตรวจสอบว่ามีการจองเกิน 3 ครั้งหรือไม่
        if (state.bookItems.length >= 3) {
          alert("คุณไม่สามารถจองได้มากกว่า 3 ครั้ง");
          return;
        }
        // เพิ่มการจองใหม่
        state.bookItems.push(action.payload);
      }
    },

    // ลบการจอง
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (item) =>
          !(item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate)
      );
    },

    // เคลียร์การจองทั้งหมด
    clearBookings: (state) => {
      state.bookItems = [];
    },
  },
});

// ส่งออก actions
export const { addBooking, removeBooking, clearBookings, setVenueItems } = bookSlice.actions;

// ส่งออก reducer
export default bookSlice.reducer;