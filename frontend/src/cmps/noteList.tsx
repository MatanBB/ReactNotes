
import { Note } from '../models/note.model'
import { ChangeEvent, useState } from 'react'
import { noteService } from '../services/note.service'
import { filterBy } from '../models/filterBy.model'
import { currUser } from '../models/currUser.model'
import { useSelector } from 'react-redux'
import NoteCmp from './NoteCmp'

interface Props {
  notes: Note[],
  removeNote: (noteId: string) => Promise<void>,
  fetchNotes: (filterBy: filterBy) => Promise<any>
}


function NoteList({ notes, removeNote, fetchNotes }: Props) {

  const currUser: currUser = useSelector((state: any) => { return state.currUser })
  const [SelectedNote, setSelectedNote] = useState<any | null>(null)
  const [noteToDisplay, setNoteToDisplay] = useState<any | null>(null)

  const onChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setSelectedNote({ ...SelectedNote, [key]: e.currentTarget.value })
  }

  const submitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    noteService.save(SelectedNote)
    setSelectedNote(null)
    fetchNotes({ ownerId: currUser._id })
  }

  const getNoteById = async (noteId: string, action: string) => {
    const note = await noteService.getById(noteId)
    if (action === 'edit') { setSelectedNote(note); return setNoteToDisplay(null) }
    if (action === 'display') { setNoteToDisplay(note); return setSelectedNote(null) }
  }

  if (!currUser._id) return (null)

  if (currUser._id && !notes.length) return (
    <div>
      <p className='errorMsg'>Please add notes..</p>
      <p className='errorMsgUnderline'>. . .</p>
    </div>)

  return (
    <section className='note-list'>
      <ul>
        {notes.map((note: Note) => (
          <NoteCmp key={note.text} removeNote={removeNote} getNoteById={getNoteById} note={note} />
        ))}
      </ul>
      {SelectedNote &&
        <div className='user-page'>
          <form onSubmit={(e) => submitNote(e)}>
            <button onClick={() => setSelectedNote(null)} className="close-button">x</button>
            <h2>Edit Note</h2>

            <main>
              <div>
                <label htmlFor="Title">New Title:</label>
                <input type="text" id="Title" value={SelectedNote.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(e, 'title') }}
                />
              </div>

              <div>
                <label htmlFor="text">New Text:</label>
                <textarea id="text" rows={12} cols={60} value={SelectedNote.text}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { onChange(e, 'text') }} />
              </div>
            </main>
            <button>Edit</button>
          </form>
        </div>}

      {noteToDisplay &&
        <div className='display-note'>
          <form onSubmit={(e) => submitNote(e)}>
            <button onClick={() => setNoteToDisplay(null)} className="close-button">x</button>
            <main>
              <h3>{noteToDisplay.title}</h3>
              <p>{noteToDisplay.text}</p>
            </main>
          </form>
        </div>
      }
    </section>
  )
}

export default NoteList