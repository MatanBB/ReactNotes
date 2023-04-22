import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux/es/exports.js'
import { setOwnerId, clearParticipants, pushParticipant, setName, setSearchParticipants, checkParticipantId, removeParticipant } from '../redux/slices/group.slice'
// import { noteService } from '../services/note.service'
import { currUser } from '../models/currUser.model'
import { filterBy } from '../models/filterBy.model'
import { Group } from '../models/group.model'
import { groupService } from '../services/group_notes.service'
import { groups } from '../redux/slices/groups.slice'
import { userService } from '../services/user.service'
type Props = {
  fetchGroups: (filterBy: filterBy) => Promise<any>,
  // groups: Group[],
}

function GroupCreate({ fetchGroups }: Props) {
  const group: Group = useSelector((state: any) => { return state.group })
  const currUser: currUser = useSelector((state: any) => { return state.currUser })
  const dispatch = useDispatch()
  const modalRef = useRef<HTMLDialogElement>(null)
  const [users, setUsers] = useState([])
  const [scrollable, setScrollable] = useState(true)

  scrollable ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"

  const searchParticipants = async (fullname: String) => {
    const users1 = await userService.queryByFullname(fullname)
    console.log(users1)
    setUsers(users1)
  }

  const getUserById = async (userId: string) => {
    const user = await userService.getUserById(userId)
    return user
  }

  const checkParticipantId = (userId: string) => {
    try {
      group.participants?.forEach((currUser: any) => {
        if (currUser._id === userId) throw 'Select another user';
      })
      return true
    } catch (e) {
      return false
    }
  }

  const handleDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currUser._id) return alert('Log in to create a group')
    if (!group.name || !group.participants) return alert('missing information')
    const newGroup = {...group}
    delete newGroup.searchParticipants
    await groupService.save({ ...newGroup, "ownerId": currUser._id })
    await fetchGroups({ ownerId: currUser._id })
    modalRef.current?.close()
    dispatch(setName(''))
    dispatch(setSearchParticipants(''))
    dispatch(setOwnerId(null))
    dispatch(clearParticipants())
    setScrollable(true)
  }

  const toggleNoteAdd = () => {
    if (!modalRef.current?.open) {
      modalRef.current?.show()
      setScrollable(false)
    }
    else {
      setScrollable(true)
      modalRef.current?.close()
    }
  }

  if (!currUser._id) return null
  return (
    <div className='note-create-container'>
      <button className='add-group-toggle' onClick={toggleNoteAdd}>Add Group</button>

      <dialog ref={modalRef} className='group-dialog'>
        <button className='close-btn' onClick={toggleNoteAdd}>x</button>
        <form onSubmit={handleDeck} className="create-note-form">
          <h2>Create new group</h2>
          <div className='group-participants'>
            <p>Invited:</p>
            <div className='group-participants-list'>
              {group.participants?.length ? group.participants.map((user: any) => (
                <div key={user._id} className='participant'
                  onClick={async () => {
                    // const isValid = checkParticipantId(user._id)
                    // console.log('isValid');
                    // const selectedUser = await getUserById(user._id)
                    // dispatch(pushParticipant(selectedUser))
                  }}
                ><p>{user.fullname}</p>
                  <span onClick={() => {
                    dispatch(removeParticipant(user._id))
                  }}>x</span>
                </div>)) : null}
            </div>
          </div>
          <div>
            <label htmlFor='note-title'>Group name</label>
            <input type="text" id='note-title'
              value={group?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setName(e.target.value))
              }} />
          </div>

          <div className='search-dropdown'>
            <label htmlFor='note-text'>Group participants</label>

            <div className='dropdown-container'>
              <input type="text" id='note-text'
                value={group?.searchParticipants}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(setSearchParticipants(e.target.value));
                  searchParticipants(e.target.value)
                }} />
              <div >
                <ul className='user-searchlist'>
                  {group.searchParticipants?.length ? users.map((user: any) => (
                    <p key={user._id}
                      onClick={async () => {
                        const isValid = checkParticipantId(user._id)
                        if (!isValid) return console.log('Select a diferent user')
                        const selectedUser = await getUserById(user._id)
                        dispatch(pushParticipant(selectedUser))
                        dispatch(setSearchParticipants(''))
                      }}
                    >{user.fullname}</p>)) : null}
                </ul>
              </div>
            </div>

          </div>
          <button>Add group</button>
        </form>
      </dialog>
    </div>
  )
}

export default GroupCreate