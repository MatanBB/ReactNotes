const express = require('express')
const {
  requireAuth,
} = require('../../middlewares/requireAuth.middleware')
const {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  removeNote,
  getSearchedNotes
} = require('./note.controller')
const router = express.Router()

router.get('/', getNotes)
router.get('/searchedNotes', getSearchedNotes)
router.get('/:id', getNoteById)
router.post('/', addNote) 

/*requireAuth in the below put is needed*/
router.put('/:id',  updateNote)

router.delete('/:id', removeNote) 

module.exports = router
