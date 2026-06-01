import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt?: string;
};

type TicketState = {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
};

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "tickets",

  initialState,

  reducers: {
    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },

    updateTicketStatus: (state, action) => {
      const ticket = state.tickets.find(
        (item) => item.id === action.payload.id,
      );

      if (ticket) {
        ticket.status = action.payload.status;
      }
    },

    setTickets: (state, action) => {
      state.tickets = action.payload;
    },

    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload,
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    updateTicket: (state, action) => {
      const index = state.tickets.findIndex(
        (ticket) => ticket.id === action.payload.id,
      );

      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
  },
});

export const {
  addTicket,
  updateTicketStatus,
  setLoading,
  setError,
  setTickets,
  deleteTicket,
  updateTicket
} = ticketSlice.actions;

export default ticketSlice.reducer;
