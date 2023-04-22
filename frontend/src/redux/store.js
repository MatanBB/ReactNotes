import { configureStore } from "@reduxjs/toolkit"
import notesReducer from './slices/notes.slice'
import formReducer from './slices/form.slice'
import groupReducer from './slices/group.slice'
import groupsReducer from './slices/groups.slice'
import currUserReducer from './slices/currUser.slice'
import userCredReducer from "./slices/userCred.slice"

export const store= configureStore({
  reducer:{
    notes:notesReducer,
    form:formReducer,
    currUser:currUserReducer,
    userCred:userCredReducer,
    groups:groupsReducer,  
    group:groupReducer
  }
})