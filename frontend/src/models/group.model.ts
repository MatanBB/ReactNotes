import { Note } from "./note.model";

export interface Group{
  "_id":string,
  "ownerId":string,
  "notes"?:Note[]|[],
  "participants"?:string[],
  "searchParticipants"?:string,
  "name":string|'Enter name'
}