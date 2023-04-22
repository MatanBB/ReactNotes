import { Note } from "../models/note.model"
import background from '../assets/images/noteImg1.jpg'
interface Props {
  note: Note,
  getNoteById: (noteId: string,action:'display'|'edit') => Promise<void>,
  removeNote: (noteId: string) => Promise<void>,
}

function NoteCmp({ note, removeNote, getNoteById }: Props) {
  if (!note) { return <p>Note not found</p> }
  return (
    <div key={note.owner.ownerId} style={{ backgroundImage: `url(${background})` }}>
      <button className='close-btn' onClick={() => { removeNote(note._id) }}>x</button>
      <li onClick={() => {
        getNoteById(note._id,'display')
      }}>
        <h3 title={note.title} className='note-title'>{note.title}</h3>
        <p>{note.text}</p>
        <p className='author'>Written by {note.owner.name || 'Unanimous'}</p>
      </li>
      <button className='edit-btn' onClick={() => {
        getNoteById(note._id, 'edit')
      }}>Edit your note</button>
    </div>
  )

}

export default NoteCmp