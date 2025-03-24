'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeReservation, clearReservations } from '@/redux/features/reserveSlice';

export default function AllReservations() {
  const dispatch = useDispatch();

  // ดึงข้อมูลการจองทั้งหมดจาก Redux store
  const reservations = useSelector((state: RootState) => state.reserveSlice.reserveItems);

  const handleRemoveReservation = (reservation: any) => {
    dispatch(removeReservation(reservation));
  };

  const handleClearReservations = () => {
    dispatch(clearReservations());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl text-yellow-950 font-bold mb-6">All Reservations</h1>
      
      {reservations.length === 0 ? (
        <p className="text-xl text-center text-gray-500">No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-yellow-950 text-white">
                <th className="px-6 py-3 text-left">Reservation ID</th>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Venue</th>
                <th className="px-6 py-3 text-left">Book Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{reservation.id}</td>
                  <td className="px-6 py-4">{reservation.nameLastname}</td>
                  <td className="px-6 py-4">{reservation.venue}</td>
                  <td className="px-6 py-4">{reservation.bookDate}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRemoveReservation(reservation)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={handleClearReservations}
          className="bg-yellow-950 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          Clear All Reservations
        </button>
      </div>
    </div>
  );
}
