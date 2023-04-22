import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  _id: null,
  fullname: null,
  // "username": null,
  isAdmin:false
}

export const currUser = createSlice({
  name: 'currUser',
  initialState,
  reducers: {
    setId: (state, action) => {
      state._id = action.payload
    },
    setFullname: (state, action) => {
      state.fullname = action.payload
    },
    // setUsername: (state, action) => {
    //   state.username = action.payload
    // },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload
    }
  }
})

export const { setId, setFullname,setAdmin } = currUser.actions

export default currUser.reducer
