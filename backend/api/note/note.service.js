const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  console.log(criteria);
  const collection = await dbService.getCollection('note')
  var notes = await collection.find(criteria).toArray()
  return notes
}

async function querySearchedNotes(country) {
  const criteria = _buildCriteria({ country })
  const collection = await dbService.getCollection('note')
  var notes = await collection.find(criteria).limit(5).toArray()
  return notes.map(note => {
    return { country: note.loc.country, city: note.loc.city, name: note.name }
  })
}

async function getById(noteId) {
  // const collection = await dbService.getCollection('note')
  // console.log('waht');
  // const note = await collection.findOne({ _id: ObjectId(noteId) })
  // console.log('note');
  // return note
  try {
    const collection = await dbService.getCollection('note')
    const note = await collection.findOne({ _id: new ObjectId(noteId) })
    return note
  } catch (err) {
    throw err
  }
}

async function remove(noteId) {
  const collection = await dbService.getCollection('note')
  await collection.deleteOne({ _id: new ObjectId(noteId) })
  return noteId
}

async function add(note) {
  const collection = await dbService.getCollection('note')
  const { ops } = await collection.insertOne(note)
}

async function update(note) {
  const id = new ObjectId(note._id)
  delete note._id
  const collection = await dbService.getCollection('note')
  await collection.updateOne({ _id: id }, { $set: { ...note } })
  note._id = id
  return note
}

function _buildCriteria(filterBy) {
  var criteria = {}
  if (filterBy.ownerId) {
    const labelCriteria = { $regex: filterBy.ownerId, $options: 'i' }
    criteria["owner.ownerId"]= labelCriteria
  }
  // if (filterBy.label) {
  //   const labelCriteria = { $regex: filterBy.label, $options: 'i' }
  //   criteria.type = labelCriteria
  // }
  // if(filterBy.capacity){
  //   criteria.capacity = {$gt: +filterBy.guestsCount}
  // }

  return criteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  querySearchedNotes
}
