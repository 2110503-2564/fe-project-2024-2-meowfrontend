'use client';

import DateReserve from "@/components/DateReserve";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { addBooking, setVenueItems } from "@/redux/features/bookSlice"; // เพิ่ม import setVenueItems
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect } from 'react'; // เพิ่ม import useEffect
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // ให้แน่ใจว่า import RootState ที่ถูกต้อง
// import { useSession } from "next-auth/react";

export default function Bookings() {

    // const { data: session } = useSession(); // Use session to get user data
    // if (!session) {
    //     return <div>Please log in to see your bookings.</div>; // Early return if not logged in
    // }

    // const userId = session.user._id; // Extract user ID from session
    const dispatch = useDispatch<AppDispatch>();
    const [nameLastname, setNameLastname] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [venue, setVenue] = React.useState("");
    const [bookDate, setBookDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");  // สถานะสำหรับเวลาเริ่มต้น
    const [endTime, setEndTime] = React.useState("");      // สถานะสำหรับเวลาสิ้นสุด
    const venueItems = useSelector((state: RootState) => state.bookSlice.venueItems);

    // ฟังก์ชันดึงข้อมูลร้านจาก Backend
    const fetchVenues = async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/massageshops');
            const data = await response.json();
            console.log("Fetched Venues:", data);
    
            // ตรวจสอบว่า data.data เป็น array หรือไม่
            if (Array.isArray(data.data)) {
                dispatch(setVenueItems(data.data)); // ใช้ data.data เป็น array ของสถานที่
            } else {
                console.error("API ไม่คืนค่าเป็น Array:", data);
                dispatch(setVenueItems([])); // ป้องกัน error
            }
        } catch (error) {
            console.error('Failed to fetch venues:', error);
        }
    };
    
    // ดึงข้อมูลร้านเมื่อคอมโพเนนต์ถูกโหลด
    useEffect(() => {
        fetchVenues(dispatch);
    }, []);
    
    const makeBooking = () => {
        if (nameLastname && tel && venue && bookDate && startTime && endTime) {
            const item = {
                nameLastname,
                tel,
                venue,
                bookDate,
                startTime,
                endTime
            };
            console.log("Booking Item to Dispatch: ", item);  // Log the item
            dispatch(addBooking(item)); // Dispatch action to Redux
        } else {
            console.log("Incomplete booking details:", { nameLastname, tel, venue, bookDate, startTime, endTime });
        }
    };
    
    return (
        <main className="bg-slate-100 m-5 p-5">
            {/* ส่วนของการจองสถานที่ */}
            <main className="w-[100%] flex flex-col items-center space-y-4">
                <div className="text-xl font-medium">New Booking</div>

                <div className="w-fit space-y-2">
                    <div className="text-md text-left text-gray-600">Date Reserve</div>
                    <DateReserve onChange={setBookDate} />
                </div>

                <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
                    <TextField
                        id="name-lastname"
                        label="Name-Lastname"
                        variant="standard"
                        name="Name-Lastname"
                        value={nameLastname}
                        onChange={(e) => setNameLastname(e.target.value)}
                    />
                    <TextField
                        id="contact-number"
                        label="Contact-Number"
                        variant="standard"
                        name="Contact-Number"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                    <Select
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        displayEmpty
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value="japaneseMassage">Japanese Massage</MenuItem>
                        <MenuItem value="saltSpaAndMassage">Salt Spa and Massage</MenuItem>
                        <MenuItem value="massageTherapy">Massage Therapy</MenuItem>
                        <MenuItem value="networks">Networks</MenuItem>
                        <MenuItem value="bandwidth">Bandwidth</MenuItem>
                        <MenuItem value="HimalayanSaltMassage">Himalayan Salt Massage</MenuItem>
                        <MenuItem value="Relaxing">Relaxing</MenuItem>
                        <MenuItem value="partnerships">Partnerships</MenuItem>
                        <MenuItem value="solutions">Solutions</MenuItem>
                        <MenuItem value="communities">Communities</MenuItem>
                    </Select>

                     {/* ฟิลด์สำหรับเวลาเริ่มต้นและสิ้นสุด */}
                     <TextField
                        id="start-time"
                        label="Start Time"
                        type="time"
                        variant="standard"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 minutes increment
                        }}
                    />
                    <TextField
                        id="end-time"
                        label="End Time"
                        type="time"
                        variant="standard"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 minutes increment
                        }}
                    />

                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#93ADDA',
                        '&:hover': {
                            backgroundColor: '#6c7a92', 
                        },
                    }}
                    onClick={makeBooking} 
                >
                    Book Venue
                </Button>
            </main>
        </main>
    );
}