import { createSlice } from "@reduxjs/toolkit";

const loadReservations = () => {
  try {
    const saved = localStorage.getItem("reservations");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading reservations:", error);
  }
  return [];
};

const initialState = {
  reservations: loadReservations(),
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addReservation: (state, action) => {
      const newReservation = {
        ...action.payload,
        id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      state.reservations.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(state.reservations));
    },
    cancelReservation: (state, action) => {
      const reservation = state.reservations.find(
        (r) => r.id === action.payload
      );
      if (reservation) {
        reservation.status = "cancelled";
        localStorage.setItem(
          "reservations",
          JSON.stringify(state.reservations)
        );
      }
    },
  },
});

export const { addReservation, cancelReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;
