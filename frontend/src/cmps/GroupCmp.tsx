import { useSelector } from 'react-redux'
import background from '../assets/images/noteImg1.jpg'
import { Group } from "../models/group.model"
import { currUser } from '../redux/slices/currUser.slice'
interface Props {
  group: Group,
  handleGroupById: (noteId: string, action: 'leave' | 'edit' | 'display') => Promise<void>,
  removeGroup: (noteId: string) => Promise<void>,
}

function GroupCmp({ group, removeGroup, handleGroupById }: Props) {
  const currUser = useSelector((state: any) => state.currUser)
  if (!group) { return <p>Note not found</p> }
  return (
    <div key={group.ownerId} className='group-div'>
      <button className='close-btn' onClick={() => { removeGroup(group._id) }}>x</button>
      <li onClick={() => {
        handleGroupById(group._id, 'display')
      }}>
        <h3 title={group.name} className='note-title'>{group.name}</h3>
        <p>{group.participants?.length} participants</p>
        {/* <p className='author'>Written by {group.owner.name || 'Unanimous'}</p> */}
      </li>
      {group.ownerId === currUser._id ? <button className='edit-btn' onClick={() => {
        handleGroupById(group._id, 'edit')
      }}>Edit group</button> : <button className='edit-btn' onClick={async () => {
       handleGroupById(group._id, 'leave')
      }}>Leave</button>}
    </div>
  )

}

export default GroupCmp