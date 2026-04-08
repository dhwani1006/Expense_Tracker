import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${BASE_URL}/expenses`;

// GET
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

// POST
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense) => {
    const res = await axios.post(API, expense);
    return res.data;
  }
);

// DELETE
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

// UPDATE
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, data }) => {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default expenseSlice.reducer;