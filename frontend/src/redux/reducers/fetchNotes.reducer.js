import { createSlice,current } from '@reduxjs/toolkit'
import { noteService } from '../../services/note.service';
const initialState = {}

export const form = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
    setOwner:(state, action) => {
      const func = async() =>{
        state['owner']  = action.payload
        await noteService.save(state)
        console.log('done reducer from store')
      }
      func()
    }
  }
})

export const { setTitle, setText, setOwner } = form.actions

export default form.reducer
