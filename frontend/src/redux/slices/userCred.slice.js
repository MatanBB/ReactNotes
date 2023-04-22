import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  "fullname": null,
  "username": null,
  "password":null,
  "isAdmin":false
}

export const userCred = createSlice({
  name: 'userCred',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setFullname: (state, action) => {
      state.fullname = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload
    }
  }
})

export const { setPassword, setFullname, setUsername,setAdmin } = userCred.actions

export default userCred.reducer
