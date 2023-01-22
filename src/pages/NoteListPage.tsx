import React, { useEffect, useState } from 'react'
import ListItem from '../components/ListItem';
import { Note } from '../models/models';
import AddButton from '../components/AddButton';

const NoteListPage = () => {

  let [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch('https://3786-90-220-73-100.eu.ngrok.io/notes/')
    let data = await response.json()
    
    setNotes(
      data.sort((a:Note, b:Note) => 
        (a.id > b.id) 
          ? -1 
          : ((b.id > a.id) ? 1 : 0)
      )
    )
  }

  return (
    <div className='notes'>
      <div className="notes-header">
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
        {
          notes.map(
            note => (
              <ListItem key={note.id} note={note} />
            )
          )
        }
      </div>
      
      <AddButton />
    </div>
  )
}

export default NoteListPage