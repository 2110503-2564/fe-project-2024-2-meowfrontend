import { ReservationItem } from "../../interface";

export default async function updateReservationItem(
  token: string,
  reservationId: string,
  updateData: Partial<ReservationItem>
): Promise<ReservationItem> {
  try {
    const response = await fetch(`http://localhost:5003/api/v1/massageshops/reservations/${reservationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update reservation");
    }

    const data = await response.json();
    return data.data as ReservationItem;
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
}