import { useEffect, useState } from "react"
import { Group } from "../models/group.model"
import { Note } from "../models/note.model"
import NoteCreate from "./NoteCreate"
import { fetchNotes } from "../redux/slices/form.slice"

interface Props {
  group: Group,
  returnFunction: () => void
}

function GroupDisplay({ group, returnFunction }: Props) {
  const [groupNotes, setGroupNotes] = useState([])

  const fetchGroupNotes = async () => {

  }
  return (
    <div className="group-display">
      <button onClick={() => { returnFunction() }}>Return</button>
      <p>{group.name}</p>
      <p>Submissions: {group.notes?.length} </p>
      <p>Current participants:{group.participants?.length}</p>
      <div>
        {group.notes?.map((note: Note) => (
          // <NoteCmp key={group._id} removeNote={removeNote} getNoteById={getNoteById} note={note} />
          <p>{note.text}</p>
        ))}
      </div>
      {group._id && <NoteCreate fetchNotes={fetchGroupNotes} filterBy={{ groupId: group._id }} group={group} />}
      <button onClick={() => console.log(group)}>Add note</button>
    </div>
  )
}

export default GroupDisplay