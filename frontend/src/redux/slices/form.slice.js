import { createSlice, current,createAsyncThunk } from '@reduxjs/toolkit'
import { noteService } from '../../services/note.service';
import { store } from '../store';
import { currUser  } from './currUser.slice';
const initialState = {
  title: "",
  text: "",
  ownerId: "",
  ownerFullname:""
}

export const fetchNotes = createAsyncThunk(
  'note/fetch', ()=>{
    return noteService.save(current(state))
  }
)

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
    // setOwner: (state, action) => {
    //   const func = async () => {
    //     state.owner = action.payload
    //     await noteService.save(current(state))
    //     console.log(state.owner, 'uploaded state');
    //   }
    //   func()
    // },
    setOwnerId: (state, action) => {
      state.ownerId = action.payload
    },
    setOwnerFullname: (state, action) => {
      state.ownerFullname = action.payload
      console.log(current(state),'current state');
    },

  }
})

export const { setTitle, setText, setOwnerId,setOwnerFullname } = form.actions

export default form.reducer
