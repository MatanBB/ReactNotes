export interface Note{
  "_id":string,
  "text":string,
  "owner":{name:object|undefined,ownerId:string},
  "title":string
}