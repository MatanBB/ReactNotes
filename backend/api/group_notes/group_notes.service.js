const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  const collection = await dbService.getCollection('group_notes')
  var groups = await collection.find(criteria).toArray()
  return groups
}

// async function querySearchedNotes(country) {
//   const criteria = _buildCriteria({ country })
//   const collection = await dbService.getCollection('group_notes')
//   var notes = await collection.find(criteria).limit(5).toArray()
//   return notes.map(note => {
//     return { country: note.loc.country, city: note.loc.city, name: note.name }
//   })
// }

async function getById(noteId) {
  // const collection = await dbService.getCollection('note')
  // console.log('waht');
  // const note = await collection.findOne({ _id: ObjectId(noteId) })
  // console.log('note');
  // return note
  try {
    const collection = await dbService.getCollection('group_notes')
    const note = await collection.findOne({ _id: new ObjectId(noteId) })
    return note
  } catch (err) {
    throw err
  }
}

async function remove(noteId) {
  const collection = await dbService.getCollection('group_notes')
  await collection.deleteOne({ _id: new ObjectId(noteId) })
  return noteId
}

async function add(group) {
  const collection = await dbService.getCollection('group_notes')
  group['notes'] = []
  // group['participants'].length ? group['participants'] = group['participants'] : group['participants'] = []
  const { ops } = await collection.insertOne(group)
  return ops
}

async function update(note) {
  const id = new ObjectId(note._id)
  delete note._id
  const collection = await dbService.getCollection('group_notes')
  await collection.updateOne({ _id: id }, { $set: { ...note } })
  note._id = id
  return note
}

function _buildCriteria(filterBy) {
  var criteria = {}
  if (filterBy.ownerId) {
    return {$or: [
      {"ownerId": filterBy.ownerId},
      {"participants._id": filterBy.ownerId}]}
    const labelCriteria = { $regex: filterBy.ownerId, $options: 'i' }
    criteria["ownerId"] = labelCriteria
    // criteria["ownerId"]= labelCriteria
  }
  if (filterBy.ownerId) {
    const labelCriteria = { $regex: filterBy.label, $options: 'i' }
    criteria["participants._id"] = labelCriteria
  }
  // if(filterBy.capacity){
  //   criteria.capacity = {$gt: +filterBy.guestsCount}
  // }

 
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  // querySearchedNotes
}
