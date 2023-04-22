const noteService = require('./note.service.js')
// const authService = require('../auth/auth.service.js')
// const { broadcast } = require('../../services/socket.service.js')

async function getNotes(req, res) {
  try {
    const queryParams = req.query
    const notes = await noteService.query(queryParams)
    res.json(notes)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function getSearchedNotes(req, res){
  try{
    const queryParams = req.query
    const notes = await noteService.querySearchedStays(queryParams['0'])
    res.json(notes)
  } catch (err) {
    console.log(err);
    res.status(404).send(err)
  }
}

async function getNoteById(req, res) {
  try {
    const noteId = req.params.id
    const note = await noteService.getById(noteId)
    res.json(note)
  } catch (err) {
    res.status(404).send(err)
  }
}

async function addNote(req, res) {
  const note = req.body
  try {
    const addednote = await noteService.add(note)
    // const loggedinUser = authService.validateToken(req.cookies.loginToken)
    // broadcast({ type: 'something-changed', userId: loggedinUser._id })
    res.json(addednote)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function updateNote(req, res) {
  try {
    const note = req.body
    const updatedNote = await noteService.update(note)
    res.json(updatedNote)
  } catch (err) {
    res.status(500).send(err)
  }
}

async function removeNote(req, res) {
  try {
    const noteId = req.params.id
    const removedId = await noteService.remove(noteId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send(err)
  }
}



module.exports = {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  removeNote,
  getSearchedNotes
}
