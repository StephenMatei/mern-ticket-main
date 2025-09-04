import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  tickets: null,
  ticket: null,
};

// Create new ticket (works for guests too)
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth?.user?.token || null; // optional for guests
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get user tickets (requires login)
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get user ticket (requires login)
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Close ticket (requires login)
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.ticket = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.tickets = state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        // Optional: Add new ticket to the list if tickets array exists
        if (state.tickets) state.tickets.push(action.payload);
        state.ticket = action.payload;
      });
  },
});

export default ticketSlice.reducer;
