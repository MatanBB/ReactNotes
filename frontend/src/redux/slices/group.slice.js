import { createSlice, current } from '@reduxjs/toolkit'
import { groupService } from '../../services/group_notes.service'
const initialState = {
  name: '',
  searchParticipants: '',
  participants: [],
  ownerId: ''
}

export const group = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setSearchParticipants: (state, action) => {
      state.searchParticipants = action.payload
    },
    clearParticipants: (state) => {
      state.participants = []
    },
    pushParticipant: (state, action) => {
      const user = action.payload
      state.participants.push(user)
      console.log(current(state));
    },
    setOwnerId: (state, action) => {
      state['ownerId'] = action.payload
    },
    removeParticipant: (state, action) => {
      const currId = action.payload
      state.participants = state.participants.filter((currUser) =>  currId !== currUser._id)
    },
  }
})

export const { setOwnerId,clearParticipants, pushParticipant, setSearchParticipants, setName, checkParticipantId, removeParticipant } = group.actions

export default group.reducer
