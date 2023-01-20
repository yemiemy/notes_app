import React from 'react'
import { Note } from '../models/models'
import { Link } from 'react-router-dom'

type Props = {
    note: Note
}

const getDate = (note: Note) => {
  const date: string = note.updated ? new Date(note.updated).toDateString() : ""
  return date
}

const getTitle = (note: Note) => {
  const title: string = note.body ? note.body.split('\n')[0] : ""
  if (title.length > 45){
    return title.slice(0,45)
  }
  return title
}

const getContent = (note: Note) => {
  let title = getTitle(note)
  let content: string = note.body ? note.body.replaceAll('\n', ' ').replaceAll(title, '') : ""
  
  if (content.length > 45)
    return content.slice(0, 45)
  
  return content
}

const ListItem: React.FC<Props> = ({ note }) => {

  return (
    <Link to={`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        <p><span>{getDate(note)}</span> {getContent(note)}</p>
      </div>
    </Link>
  )
}

export default ListItem