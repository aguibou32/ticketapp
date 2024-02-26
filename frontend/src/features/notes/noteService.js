import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import noteService from './noteService';

const initialState = {
  notes: [],
  isError: false, 
  isSuccess: false, 
  isLoading: false, 
  message: '' 
}