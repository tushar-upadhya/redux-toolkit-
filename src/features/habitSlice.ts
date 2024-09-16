import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HabitProps {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: HabitProps[];
  isLoading: boolean;
  error: string | null;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  error: null,
};


export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockHabits: HabitProps[] = [
    {
      id: '1',
      name: 'Exercise',
      frequency: 'daily',
      completedDates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Reading',
      frequency: 'weekly',
      completedDates: ['2022-12-15'],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Gym',
      frequency: 'daily',
      completedDates: ['2022-12-17'],
      createdAt: new Date().toISOString(),
    }
  ]

  return mockHabits;
})

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>) => {
      const newHabit: HabitProps = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      state.habits.push(newHabit);
    },
    toggleHabit: (state, action: PayloadAction<{ id: string; date: string }>) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completedDates.splice(index, 1);
        } else {
          habit.completedDates.push(action.payload.date);
        }
      }
    },
    removeHabit: (state, action: PayloadAction<{ id: string }>) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHabits.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch'
      })
  }
});

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions;
export default habitSlice.reducer;
