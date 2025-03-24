export const deleteReservation = async (id: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5003/api/v1/massageshops/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete reservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  };
