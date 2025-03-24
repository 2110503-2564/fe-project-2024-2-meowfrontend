'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/db/dbConnect";
import Reservation from "@/db/models/Reservation";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ReservationItem } from "../../interface";
import getUserProfile from "@/libs/getUserProfile";

export default async function AllReservations() {
  const session = await getServerSession(authOptions);
  console.log("Logged in as:", session?.user?.email, "Role:", session?.user?.role);

  if (!session || session.user.role !== "admin") {
    //redirect("/");
    return <p className="text-center text-black-500">You do not have permission to view this page.</p>;
  }

  const profile = await getUserProfile(session.user.token)
  console.log(profile)
  console.log("Logged in as:", session.user.email, "Role:", session.user.role);  

  await dbConnect();
  const reservations = await Reservation.find();

  const handleRemoveReservation = async (reservationId: string) => {
    'use server';
    await Reservation.findByIdAndDelete(reservationId);
    revalidateTag("reservations");
  };

  const handleClearReservations = async () => {
    'use server';
    await Reservation.deleteMany({});
    revalidateTag("reservations");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl text-yellow-950 font-bold mb-6">All Reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-xl text-center text-gray-500">No reservations found</p>
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
              {reservations.map((reservation: ReservationItem) => (
                <tr key={reservation.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{reservation.nameLastname}</td>
                  <td className="px-6 py-4">{reservation.venue}</td>
                  <td className="px-6 py-4">{reservation.bookDate}</td>
                  <td className="px-6 py-4 text-center">
                    <form action={() => handleRemoveReservation(reservation.id)}>
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <form action={handleClearReservations}>
          <button
            type="submit"
            className="bg-yellow-950 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
          >
            Clear All Reservations
          </button>
        </form>
      </div>
    </div>
  );
}
