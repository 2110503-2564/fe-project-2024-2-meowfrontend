import { ReservationItem } from "../../interface";

export default async function getAllReservations(token: string): Promise<ReservationItem[]> {
    try {
      const response = await fetch("http://localhost:5003/api/v1/massageshops/reservations", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      return data.data as ReservationItem[]; // ตามโครงสร้าง response ของคุณ
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  }
