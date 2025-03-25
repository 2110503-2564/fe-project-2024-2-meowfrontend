// 'use client';

// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { removeReservation } from '@/redux/features/reserveSlice';
// import { Button, Card, CardContent, Typography } from '@mui/material';
// import { ReservationItem } from '../../interface'; // Ensure correct import
// import { reserveSlice } from '@/redux/features/reserveSlice';

// export default function ReservationList() {
//   const reservations = useSelector((state: RootState) => state.reserveSlice.reserveItems);
//   const dispatch = useDispatch();

//   const handleCancelReservation = (reservation: ReservationItem) => {
//     dispatch(removeReservation(reservation)); // Pass the entire booking item
//   };

//   return (
//     <main className="bg-yellow-100 m-5 p-5">
//       <div className='text-xl font-bold mb-4 text-yellow-950'>Reservation List</div>
//       {reservations.length === 0 ? (
//         <Typography variant="h6" color="textSecondary">No Massage Shop Booking</Typography>
//       ) : (
//         reservations.map((reservation, index) => (
//           <Card key={index} className="mb-4" variant='outlined'>
//             <CardContent>
//               <Typography variant='h6'>{reservation.nameLastname}</Typography>
//               <Typography variant="body1">Contact: {reservation.tel}</Typography>
//               <Typography variant="body1">Massage shop name: {reservation.venue}</Typography>
//               <Typography variant="body1">Date: {reservation.bookDate}</Typography>
//               <Typography variant="body1">Start Time: {reservation.startTime}</Typography> 
//               <Typography variant="body1">End Time: {reservation.endTime}</Typography> 
//               <Button
//                 variant='contained'
//                 sx={{
//                   backgroundColor: '#93ADDA',
//                   '&:hover': {
//                     backgroundColor: '#6c7a92', 
//                   },
//                 }}
//                 onClick={() =>handleCancelReservation(reservation)}
//                 className='mt-2'
//               >
//                 Cancel Booking
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </main>
//   );
// }

'use client';

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeReservation } from '@/redux/features/reserveSlice';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { ReservationItem } from '../../interface'; // Ensure correct import
import { reserveSlice } from '@/redux/features/reserveSlice';

export default function ReservationList() {
  const reservations = useSelector((state: RootState) => state.reserveSlice.reserveItems);
  const dispatch = useDispatch();

  const handleCancelReservation = (reservation: ReservationItem) => {
    dispatch(removeReservation(reservation)); // Pass the entire booking item
  };

  return (
    <main className="bg-yellow-100 m-5 p-5">
      <div className='text-xl font-bold mb-4 text-yellow-950'>Reservation List</div>
      {reservations.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No Massage Shop Booking</Typography>
      ) : (
        reservations.map((reservation, index) => (
          <Card key={index} className="mb-4" variant='outlined'>
            <CardContent>
              <Typography variant='h6'>{reservation.nameLastname}</Typography>
              <Typography variant="body1">Contact: {reservation.tel}</Typography>
              <Typography variant="body1">Massage shop name: {reservation.venue}</Typography>
              <Typography variant="body1">Date: {reservation.bookDate}</Typography>
              <Typography variant="body1">Start Time: {reservation.startTime}</Typography> 
              <Typography variant="body1">End Time: {reservation.endTime}</Typography> 
              <Button
                variant='contained'
                sx={{
                  backgroundColor: '#93ADDA',
                  '&:hover': {
                    backgroundColor: '#6c7a92', 
                  },
                }}
                onClick={() =>handleCancelReservation(reservation)}
                className='mt-2'
              >
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        ))
      )}
      <div className="flex justify-end mb-4">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => window.print()}
      >
        Print Reservations
      </Button>
      </div>
    </main>
  );
}
