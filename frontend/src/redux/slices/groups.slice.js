import { createSlice, current } from '@reduxjs/toolkit'
const initialState = {
  groups: []
}

export const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload
      console.log(current(state))
    }
  }
})

export const { setGroups } = groups.actions

export default groups.reducer
