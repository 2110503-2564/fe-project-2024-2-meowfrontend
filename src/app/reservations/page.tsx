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

export default function Reservations() {
    const dispatch = useDispatch<AppDispatch>();
    const [nameLastname, setNameLastname] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [massageshop, setMassageshop] = React.useState("");
    const [reserveDate, setReserveDate] = React.useState("");

    const makeReservation = () => {
        if (nameLastname && tel && massageshop && reserveDate) {
            const item = {
                nameLastname,
                tel,
                massageshop,
                reserveDate
            };
            console.log("Booking Item to Dispatch: ", item);  // Log the item
            dispatch(addReservation(item)); // Dispatch action to Redux
        } else {
            console.log("Incomplete booking details:", { nameLastname, tel, massageshop, reserveDate });
        }
    };
    

    return (
        <main className="bg-slate-100 m-5 p-5">
            {/* ส่วนของการจองสถานที่ */}
            <main className="w-[100%] flex flex-col items-center space-y-4">
                <div className="text-xl font-medium">New Reservstion</div>

                <div className="w-fit space-y-2">
                    <div className="text-md text-left text-gray-600">Date Reserve</div>
                    <DateReserve onChange={setReserveDate} />
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
                        id="massageshop"
                        value={massageshop}
                        onChange={(e) => setMassageshop(e.target.value)}
                        displayEmpty
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value="JapaneseMassage">Japanese Massage</MenuItem>
                        {/* <MenuItem value="Spark">Spark Space</MenuItem>
                        <MenuItem value="GrandTable">The Grand Table</MenuItem> */}
                    </Select>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={makeReservation} 
                >
                    Reserve Massageshop
                </Button>
            </main>
        </main>
    );
}
