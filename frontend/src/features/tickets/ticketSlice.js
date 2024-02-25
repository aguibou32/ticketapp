import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false, // for the error message on the NewTicket component 
  isSuccess: false, // for resetting the state and redirecting to the tickets list if true
  isLoading: false, // For showing the Spinner component while waiting for the async request
  message: '' // For the error message
}

export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      // console.log(ticketData);
      const token = thunkAPI.getState().auth.user.token; // The thunkAPI allows us to get any slice of the state anywhere in the app. In this case, we need the token so we get the user, then the token. 

      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTickets(token);
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicket = createAsyncThunk(
  'tickets/getTicket',
  async (ticketId, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)
export const closeTicket = createAsyncThunk(
  'tickets/closeTicket',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => { // While we are wating for the createTicketAsync to finish
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => { // When it finishes with a ticket created
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => { // when it successeds
        state.isLoading = false;
        state.tickets = [...state.tickets];
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => { // When it finishes with a ticket created
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = [...action.payload]; // We dont do [action.payload] because action.payload is already an array and we dont want to have an array inside an array, like this [[action.payload]]
      })
      .addCase(getTickets.rejected, (state, action) => { // when it successeds
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getTicket function
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        // When it finishes with a ticket retrieved
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;  // Update the ticket state with the retrieved ticket
      })
      .addCase(getTicket.rejected, (state, action) => {
        // When it fails to retrieve the ticket
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // closing the ticket
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket);
      })
  }
});

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer;