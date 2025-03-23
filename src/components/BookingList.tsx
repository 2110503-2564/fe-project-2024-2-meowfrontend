'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeBooking } from '@/redux/features/bookSlice';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { BookingItem } from '../../interface'; // Ensure correct import

export default function BookingList() {
  const bookings = useSelector((state: RootState) => state.bookSlice.bookItems);
  const dispatch = useDispatch();

  const handleCancelBooking = (booking: BookingItem) => {
    dispatch(removeBooking(booking)); // Pass the entire booking item
  };

  return (
    <main className="bg-slate-100 m-5 p-5">
      <div className='text-xl font-medium mb-4'>Booking List</div>
      {bookings.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No venue Booking</Typography>
      ) : (
        bookings.map((booking, index) => (
          <Card key={index} className="mb-4" variant='outlined'>
            <CardContent>
              <Typography variant='h6'>{booking.nameLastname}</Typography>
              <Typography variant="body1">Contact: {booking.tel}</Typography>
              <Typography variant="body1">Massage shop name: {booking.venue}</Typography>
              <Typography variant="body1">Date: {booking.bookDate}</Typography>
              <Typography variant="body1">Start Time: {booking.startTime}</Typography> 
              <Typography variant="body1">End Time: {booking.endTime}</Typography> 
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#93ADDA',
                  '&:hover': {
                    backgroundColor: '#6c7a92', 
                  },
                }}
                onClick={() => handleCancelBooking(booking)}
                className='mt-2'
              >
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
