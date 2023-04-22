import { useDispatch } from 'react-redux'
import { filterBy } from '../models/filterBy.model.js'
import { Note } from '../models/note.model.js'
import { setNotes } from '../redux/slices/notes.slice.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'note'

export const noteService = {
  query,
  getById,
  save,
  remove,
  getSearchedNotes,
  getEmptyWishlistStay
}
window.cs = noteService

async function getSearchedNotes(input: string) {
  try {
    return httpService.get(`${STORAGE_KEY}/searchedStays`, input)
  } catch (err) {
    throw err
  }

}

async function query(filterBy?:filterBy): Promise<any> {
  return httpService.get(STORAGE_KEY, filterBy)
}

async function getById(noteId: string) {
  return httpService.get(`note/${noteId}`)
}

async function remove(noteId) {
  return httpService.delete(`note/${noteId}`)
}

async function save(note: Note) {
  var savedNote
  if (note._id) {
    savedNote = await httpService.put(`note/${note._id}`, note)

  } else {
    // note.owner = userService.getLoggedinUser()
    savedNote = await httpService.post('note/', note)
  }
  return savedNote
}

function getEmptyWishlistStay(note) {
  return {
    _id: note._id,
    name: note.name,
    imgUrls: note.imgUrls,
    summary: note.summary,
    loc: {
      country: note.loc.country,
      city: note.loc.city
    },
    price: note.price,
    reviews: note.reviews
  }
}