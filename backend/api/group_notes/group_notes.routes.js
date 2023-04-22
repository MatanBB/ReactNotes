const express = require('express')
const {
  requireAuth,
} = require('../../middlewares/requireAuth.middleware')
const {
  getGroupNotes,
  getGroupNoteById,
  addGroupNote,
  updateGroupNote,
  removeGroupNote,
  // getSearchedNotes
} = require('./group_notes.controller')
const router = express.Router()

router.get('/', getGroupNotes)
// router.get('/searchedNotes', getSearchedNotes)
router.get('/:id', getGroupNoteById)
router.post('/', addGroupNote) 

/*requireAuth in the below put is needed*/
router.put('/:id',  updateGroupNote)

router.delete('/:id', removeGroupNote) 

module.exports = router
