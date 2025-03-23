'use client';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DateReserveProps {
    onChange: (date: string) => void;
}

export default function DateReserve({ onChange }: DateReserveProps) {
    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD'); // กำหนดรูปแบบวันที่ที่ต้องการ
            onChange(formattedDate); // ส่งค่ากลับไปยังคอมโพเนนต์หลัก
        }
    };

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className="bg-white"
                    onChange={handleDateChange} // ใช้ handleDateChange เพื่อจัดการการเปลี่ยนแปลงวันที่
                    minDate={dayjs()} // จำกัดวันที่ไม่ให้เลือกวันในอดีต
                />
            </LocalizationProvider>
        </div>
    );
}