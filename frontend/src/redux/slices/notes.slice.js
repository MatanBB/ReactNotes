import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  notes: []
}

export const notes = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    pushNote: (state, action) => {
      console.log(action.payload,'note when pushing');
      // state.notes.push(action.payload)
    }
  }
})

export const { setNotes, pushNote } = notes.actions

export default notes.reducer
