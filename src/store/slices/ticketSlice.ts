import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
};

type TicketState = {
  tickets: Ticket[];
};

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",

  initialState,

  reducers: {

 addTicket:(state,action)=>{
   state.tickets.push(
     action.payload
   );
 },


 updateTicketStatus:(state,action)=>{
   const ticket =
     state.tickets.find(
       (item)=>
         item.id === action.payload.id
     );

   if(ticket){
    ticket.status =action.payload.status;
   }
  },


  setTickets:(state,action) => {
    state.tickets = action.payload;
  },

  deleteTicket:(state,action) => {
    state.tickets = state.tickets.filter(
      ticket =>ticket.id !== action.payload
 );
  },

  updateTicket: (state, action) => {
    const index = state.tickets.findIndex(
      ticket => ticket.id === action.payload.id
  );
  if(index !== -1){
    state.tickets[index] = action.payload;
  }
},

},
  
});

export const { addTicket , updateTicketStatus ,  setTickets, deleteTicket,updateTicket } =ticketSlice.actions;

export default ticketSlice.reducer;