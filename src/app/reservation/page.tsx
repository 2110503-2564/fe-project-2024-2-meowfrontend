'use client'; 

import DateReserve from "@/components/DateReserve";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { addReservation } from "@/redux/features/reserveSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Reservations() {

    const dispatch = useDispatch<AppDispatch>();
    const [nameLastname, setNameLastname] = React.useState("");
    const [id, setid] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [venue, setVenue] = React.useState("");
    const [bookDate, setBookDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const reservationItems = useSelector((state: RootState) => state.reserveSlice.reserveItems);

    // Function to fetch venue data from the backend
    const fetchVenues = async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/massageshops');
            const data = await response.json();
            console.log("Fetched massageshops:", data);
        } catch (error) {
            console.error('Failed to fetch massageshops:', error);
        }
    };

    useEffect(() => {
        fetchVenues(dispatch);
    }, []);

    // Function to handle booking
    const makeBooking = () => {
        if (nameLastname && tel && venue && bookDate && startTime && endTime) {
            const item = { nameLastname, id, tel, venue, bookDate, startTime, endTime };
            console.log("Booking Item to Dispatch: ", item);
            dispatch(addReservation(item));
        } else {
            console.log("Incomplete booking details:", { nameLastname, tel, venue, bookDate, startTime, endTime });
        }
    };

    return (
        <main className="bg-gray-50 p-5 rounded-lg shadow-lg">
            <div className="text-3xl font-semibold text-center text-yellow-800 mb-6">New Booking</div>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto', backgroundColor: '#fff9c4', padding: '20px', borderRadius: '8px' }} noValidate autoComplete="off">
                <div className="space-y-2">
                    <div className="text-lg text-yellow-500">Date Reserve</div>
                    <DateReserve onChange={setBookDate} />
                </div>

                <TextField
                    id="name-lastname"
                    label="Name-Lastname"
                    variant="outlined"
                    value={nameLastname}
                    onChange={(e) => setNameLastname(e.target.value)}
                    fullWidth
                />
                <TextField
                    id="contact-number"
                    label="Contact-Number"
                    variant="outlined"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    fullWidth
                />

                <Select
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
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

                {/* Time Picker fields */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        id="start-time"
                        label="Start Time"
                        type="time"
                        variant="outlined"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        fullWidth
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
                        variant="outlined"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        fullWidth
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
                    backgroundColor: '#93ADDA', // สีพื้นหลัง
                        color: 'black', // เปลี่ยนสีตัวอักษรเป็นสีดำ
                        '&:hover': {
                    backgroundColor: '#7A9BC7', // สีเมื่อ hover
                    },
                    }}
                    onClick={makeBooking}
                    fullWidth
                        >
                Book Venue
                </Button>


            </Box>
        </main>
    );
}

