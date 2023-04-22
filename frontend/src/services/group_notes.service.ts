// import { useDispatch } from 'react-redux'
import { filterBy } from '../models/filterBy.model.js'
import { Group } from '../models/group.model.js'
import { Note } from '../models/note.model.js'
import { httpService } from './http.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'group'

export const groupService = {
  query,
  getById,
  save,
  remove,
  queryByFullname,
  saveNote
  // getSearchedNotes,
  // getEmptyWishlistStay
}
// window.cs = groupService

// async function getSearchedNotes(input: string) {
//   try {
//     return httpService.get(`${STORAGE_KEY}/searchedStays`, input)
//   } catch (err) {
//     throw err
//   }

// }

async function queryByFullname(fullname: String): Promise<any> {
  return httpService.get('user/', { txt: fullname })
}

async function query(filterBy?: filterBy): Promise<any> {
  return httpService.get(STORAGE_KEY, filterBy)
}

async function getById(groupId: string) {
  return httpService.get(`group/${groupId}`, null)
}

async function remove(groupId: string) {
  return httpService.delete(`group/${groupId}`, null)
}

async function save(group: Group) {
  var savedGroup
  if (group._id) {
    savedGroup = await httpService.put(`group/${group._id}`, group)
  } else {
    // note.owner = userService.getLoggedinUser()
    savedGroup = await httpService.post('group/', group)
  }
  return savedGroup
}

async function saveNote(note: Note,groupId:string) {
  // var savedNote
  // if (note._id) {
  //   savedNote = await httpService.put(`group/${note._id}`, note)

  // } else {
  //   // note.owner = userService.getLoggedinUser()
  //   savedNote = await httpService.post('group/', note)
  // }
  // return savedNote
  console.log('whywywy');
  
}


// function getEmptyWishlistStay(note) {
//   return {
//     _id: note._id,
//     name: note.name,
//     imgUrls: note.imgUrls,
//     summary: note.summary,
//     loc: {
//       country: note.loc.country,
//       city: note.loc.city
//     },
//     price: note.price,
//     reviews: note.reviews
//   }
// }