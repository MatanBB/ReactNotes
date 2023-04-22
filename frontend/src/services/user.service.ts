
import { filterBy } from '../models/filterBy.model.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'user'

export const userService = {
  query,
  getUserById,
  queryByFullname,
}
window.cs = userService

async function queryByFullname(fullname: String): Promise<any> {
  return httpService.get('user/', { txt: fullname })
}


async function query(filterBy?:filterBy): Promise<any> {
  return httpService.get(STORAGE_KEY, filterBy)
}

async function getUserById(userId: string) {
  return httpService.get(`user/${userId}`)
}

// async function remove(noteId) {
//   return httpService.delete(`note/${noteId}`)
// }

// async function save(note: Note) {
//   var savedNote
//   if (note._id) {
//     savedNote = await httpService.put(`note/${note._id}`, note)

//   } else {
//     // note.owner = userService.getLoggedinUser()
//     savedNote = await httpService.post('note/', note)
//   }
//   return savedNote
// }

