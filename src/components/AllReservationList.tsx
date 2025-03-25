'use client'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeReservation, clearReservations, editReservation} from '@/redux/features/reserveSlice';
import { MenuItem, Select } from '@mui/material';

export default function AllReservations() {
  const dispatch = useDispatch();

  const [editData, setEditData] = useState<any | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const reservations = useSelector((state: RootState) => state.reserveSlice.reserveItems);

  const handleRemoveReservation = (reservation: any) => {
    dispatch(removeReservation(reservation));
  };

  const handleClearReservations = () => {
    dispatch(clearReservations());
  };

  const handleEditReservation = (reservation: any) => {
    setEditData(reservation);
    setEditModalOpen(true);
  };  

  const handleSaveEdit = () => {
    if (editData){
      dispatch(editReservation(editData))
      setEditModalOpen(false)
    }
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
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Massage Shop</th>
                <th className="px-6 py-3 text-left">Book Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{reservation.nameLastname}</td>
                  <td className="px-6 py-4">{reservation.venue}</td>
                  <td className="px-6 py-4">{reservation.bookDate}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEditReservation(reservation)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
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

      {/* Modal สำหรับการแก้ไขข้อมูล */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Reservation</h2>

            <label className="block mb-2">Customer Name:</label>
            <input
              type="text"
              value={editData?.nameLastname || ''}
              onChange={(e) => setEditData({ ...editData, nameLastname: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2">Massage Shop:</label>
            <Select
              id="venue"
              value={editData?.venue || ''}
              onChange={(e) => setEditData({ ...editData, venue: e.target.value })}
              displayEmpty
              fullWidth
              variant="standard"
              className="w-full p-2 border border-gray-300 rounded mb-4"
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
              < MenuItem value="communities">Communities</MenuItem>
            </Select>

            <label className="block mb-2">Book Date:</label>
            <input
              type="date"
              value={editData?.bookDate || ''}
              onChange={(e) => setEditData({ ...editData, bookDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}