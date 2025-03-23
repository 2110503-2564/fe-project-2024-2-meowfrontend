'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeReservation, reserveSlice } from '@/redux/features/reserveSlice';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { ReservationItem } from '../../interface'; // Ensure correct import

export default function ReservationList() {
  const reservations = useSelector((state: RootState) => state.reserveSlice.reserveItems);
  const dispatch = useDispatch();

  const handleCancelReservation = (reservation: ReservationItem) => {
    dispatch(removeReservation(reservation)); // Pass the entire booking item
  };

  return (
    <main className="bg-slate-100 m-5 p-5">
      <div className='text-xl font-medium mb-4'>Reservation List</div>
      {reservations.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No massageshop Reservation</Typography>
      ) : (
        reservations.map((reservation, index) => (
          <Card key={index} className="mb-4" variant='outlined'>
            <CardContent>
              <Typography variant='h6'>{reservation.nameLastname}</Typography>
              <Typography variant="body1">Contact: {reservation.tel}</Typography>
              <Typography variant="body1">Massageshop: {reservation.massageshop}</Typography>
              <Typography variant="body1">Date: {reservation.reserveDate}</Typography>
              <Button
                variant='contained'
                color="secondary"
                onClick={() => handleCancelReservation(reservation)}
                className='mt-2'
              >
                Cancel Reservation
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
