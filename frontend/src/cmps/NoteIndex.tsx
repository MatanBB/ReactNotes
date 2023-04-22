import { useEffect, useState } from 'react';
import { noteService } from '../services/note.service.js';
import NoteCreate from './NoteCreate.js';
import NoteList from './noteList.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports.js';
import { setNotes } from '../redux/slices/notes.slice'
import { filterBy } from '../models/filterBy.model.js';
import { groupService } from '../services/group_notes.service.js';
import { setGroups } from '../redux/slices/groups.slice.js';
import GroupCreate from './GroupCreate.js';
import GroupList from './GroupList.js';


function noteIndex() {
  const notes = useSelector((state: any) => { return state.notes.notes })
  const groups = useSelector((state: any) => { return state.groups.groups })
  const currUser = useSelector((state: any) => { return state.currUser })
  // const [filter, setFilter] = useState({ ownerId: '', text: '', title: '' })
  const dispatch = useDispatch()

  async function fetchNotes(filterBy: filterBy) {
    const recievedNotes = await noteService.query(filterBy)
      .then((res) => { return res })
    dispatch(setNotes(recievedNotes))
    return recievedNotes
  }

  async function fetchGroups(filterBy: filterBy) {
    const recievedGroups = await groupService.query(filterBy)
      .then((res) => { return res })      
    dispatch(setGroups(recievedGroups))
    console.log(recievedGroups,'whahad');
    return recievedGroups
  }

  const removeNote = async (noteId: string) => {
    await noteService.remove(noteId)
    fetchNotes({ ownerId: currUser._id })
  }


  const removeGroup = async (groupId: string) => {
    await groupService.remove(groupId)
    fetchGroups({ ownerId: currUser._id })
  }

  useEffect(() => {
    if (currUser._id) {
      fetchNotes({ ownerId: currUser._id })
      fetchGroups({ ownerId: currUser._id })
    }
  }, [currUser._id])

  return (
    <div>
      <NoteCreate fetchNotes={fetchNotes} filterBy={{ownerId:currUser._id}}/>
      <NoteList notes={notes} removeNote={removeNote} fetchNotes={fetchNotes} />
      <GroupCreate fetchGroups={fetchGroups} />
      <GroupList groups={groups} removeGroup={removeGroup} fetchGroups={fetchGroups} />
    </div>
  )
}

export default noteIndex