import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { currUser } from "../models/currUser.model"
import { filterBy } from "../models/filterBy.model"
import { Group } from "../models/group.model"
import { groupService } from "../services/group_notes.service"
import GroupCmp from "./GroupCmp"
import { log } from "console"
import GroupDisplay from "./GroupDisplay"

type Props = {
  fetchGroups: (filterBy: filterBy) => Promise<any>,
  removeGroup: (groupId: string) => Promise<void>,
  // getGroupById:(groupId: string) => Promise<void>,
  groups: Group[],
}
function GroupList({fetchGroups,removeGroup,groups}:Props) {
  const currUser: currUser = useSelector((state: any) => { return state.currUser })
  const [SelectedGroup, setSelectedGroup] = useState<any | null>(null)
  const [groupToDisplay, setGroupToDisplay] = useState<any | null>(null)

  // const getGroupById = async (groupId: string, action: string) => {
    // const group = await groupService.getById(groupId)
    // if (action === 'edit') { setSelectedGroup(group); return setGroupToDisplay(null) }
    // if (action === 'display') { setGroupToDisplay(group); return setSelectedGroup(null) }
  // }


  const handleGroupById = async (noteId:string,action:string)=>{
    if (action==="leave"){
      const group = await groupService.getById(noteId)
      group.participants = group.participants.filter(
        (member:any) =>{
          if (member._id !== currUser._id) return member
        }
      )
      await groupService.save(group)
      fetchGroups({ownerId:currUser._id})
    }
    if (action==="display"){
      const group = await groupService.getById(noteId)
      setGroupToDisplay(group)
      fetchGroups({ownerId:currUser._id})
    }
  }
  useEffect(() => {
    if(groups.length)console.log(groups);
  }, [groups.length])
  
  if (!currUser._id) return (null)

  if (currUser._id && !groups.length) return (
    <div>
      <p className='errorMsg'>No groups found..</p>
      <p className='errorMsgUnderline'>. . .</p>
    </div>)

  return (
    <section className="group-list">
       <ul>
        {!groupToDisplay && groups.map((group: Group) => (
          // <NoteCmp key={group._id} removeNote={removeNote} getNoteById={getNoteById} note={note} />
          <GroupCmp key={group._id} removeGroup={removeGroup} handleGroupById={handleGroupById} group={group} />
        ))}
      </ul>
      {groupToDisplay && <GroupDisplay group={groupToDisplay} returnFunction={()=>{setGroupToDisplay(null)}}></GroupDisplay> }
    </section>
  )
}

export default GroupList