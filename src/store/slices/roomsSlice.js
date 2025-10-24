import { createSlice } from "@reduxjs/toolkit";
import { mockRooms } from "@/services/mockData";

const initialState = {
  rooms: mockRooms,
  filteredRooms: mockRooms,
  selectedRoom: null,
  filters: {
    priceRange: [0, 1000],
    roomType: "all",
  },
  currentPage: 1,
  roomsPerPage: 6,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      const { priceRange, roomType } = state.filters;

      state.filteredRooms = state.rooms.filter((room) => {
        const priceMatch =
          room.pricePerNight >= priceRange[0] &&
          room.pricePerNight <= priceRange[1];

        const typeMatch = roomType === "all" || roomType === room.typeId;

        return priceMatch && typeMatch;
      });

      state.currentPage = 1;
    },

    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload
        ? state.rooms.find((room) => room.id === action.payload) || null
        : null;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    updateRoomAvailability: (state, action) => {
      const room = state.rooms.find((r) => r.id === action.payload.roomId);
      if (room) {
        room.availability = action.payload.availability;
      }
    },
  },
});

export const {
  setFilters,
  setSelectedRoom,
  setCurrentPage,
  updateRoomAvailability,
} = roomsSlice.actions;

export default roomsSlice.reducer;

export const selectRooms = (state) => state.rooms.rooms;
export const selectFilteredRooms = (state) => state.rooms.filteredRooms;
export const selectSelectedRoom = (state) => state.rooms.selectedRoom;
export const selectFilters = (state) => state.rooms.filters;
export const selectCurrentPage = (state) => state.rooms.currentPage;
export const selectRoomsPerPage = (state) => state.rooms.roomsPerPage;
