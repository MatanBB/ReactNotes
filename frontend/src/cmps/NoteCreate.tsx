import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux/es/exports.js'
import { setTitle, setOwnerId, setText, setOwnerFullname } from '../redux/slices/form.slice'
import { Note } from '../models/note.model'
// import { noteService } from '../services/note.service'
import { currUser } from '../models/currUser.model'
import { filterBy } from '../models/filterBy.model'
import { noteService } from '../services/note.service'
import { pushNote, setNotes } from '../redux/slices/notes.slice'
import { groupService } from '../services/group_notes.service'
import { Group } from '../models/group.model'
// import { store } from '../redux/store'
type Props = {
  fetchNotes: (filterBy: filterBy) => Promise<any>,
  filterBy: filterBy,
  group: Group | undefined
}

function NoteCreate({ fetchNotes, filterBy, group }: Props) {

  let note: Note = useSelector((state: any) => state.form)
  const currUser: currUser = useSelector((state: any) => { return state.currUser })
  const dispatch = useDispatch()
  const dialog = document.querySelector('dialog')

  const handleDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!currUser._id) return alert('Log in to create a note')
    // if (!note?.title || !note?.text) return alert('missing information')
    // // dispatch(setOwnerId(currUser._id ));
    // // dispatch(setOwnerFullname(currUser.fullname ));
    // !group?._id ?
    //   await noteService.save({ ...note, "owner": { name: currUser.fullname, ownerId: currUser._id } })
    //   : await groupService.saveNote({ ...note, "owner": { name: currUser.fullname, ownerId: currUser._id } }, group._id)
    // await fetchNotes(filterBy)
    console.log(group);
    
    // dialog?.close()
    // dispatch(setText(''))
    // dispatch(setTitle(''))
  }

  const toggleNoteAdd = () => {
    !dialog?.open ? dialog?.show() : dialog?.close()
  }
  if (!currUser._id) return <div>
    <p className='errorMsg'>Please login</p>
    <p className='errorMsgUnderline'>. . .</p>
  </div>
  return (
    <div className='note-create-container'>
      <button className='add-note-toggle' onClick={toggleNoteAdd}>Add note</button>

      <dialog>
        <button className='close-btn' onClick={() => { dialog?.close() }}>x</button>
        <form onSubmit={handleDeck} className="create-note-form">
          <h2>Create new note</h2>
          <div>
            <label htmlFor='note-title'>Note Title</label>
            <input type="text" id='note-title'
              value={note.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setTitle(e.target.value))
              }} />
          </div>

          <div>
            <label htmlFor='note-text'>Note Text</label>
            <input type="text" id='note-text'
              value={note.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setText(e.target.value))
              }} />
          </div>
          <button>Add note</button>
        </form>
      </dialog>
    </div>
  )
}

export default NoteCreate