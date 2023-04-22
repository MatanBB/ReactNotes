const groupNoteService = require('./group_notes.service.js')
// const authService = require('../auth/auth.service.js')
// const { broadcast } = require('../../services/socket.service.js')

async function getGroupNotes(req, res) {
  try {
    const queryParams = req.query
    console.log(queryParams);
    const groups = await groupNoteService.query(queryParams)
    res.json(groups)
  } catch (err) {
    res.status(404).send(err)
  }
}

// async function getSearchedNotes(req, res){
//   try{
//     const queryParams = req.query
//     const notes = await noteService.querySearchedStays(queryParams['0'])
//     res.json(notes)
//   } catch (err) {
//     console.log(err);
//     res.status(404).send(err)
//   }
// }

async function getGroupNoteById(req, res) {
  try {
    const noteId = req.params.id
    const note = await groupNoteService.getById(noteId)
    res.json(note)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addGroupNote(req, res) {
  const group = req.body
  try {
    const addedgroup = await groupNoteService.add(group)
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // broadcast({ type: 'something-changed', userId: loggedinUser._id })
    res.json(addedgroup)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateGroupNote(req, res) {
  try {
    const note = req.body
    const updatedNote = await groupNoteService.update(note)
    res.json(updatedNote)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeGroupNote(req, res) {
  try {
    const noteId = req.params.id
    const removedId = await groupNoteService.remove(noteId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}



module.exports = {
  getGroupNotes,
  getGroupNoteById,
  addGroupNote,
  updateGroupNote,
  removeGroupNote,
  // getSearchedNotes
}
