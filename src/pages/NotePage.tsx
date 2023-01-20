import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Note } from '../models/models'

const NotePage:React.FC = () => {
    let note_id = useParams().id
    let navigate = useNavigate();

    let [note, setNote] = useState<Note>()

    useEffect(() => {
      getNote()
    }, [note_id])

    let getNote = async () => {
      if (note_id === 'new') return
      let response = await fetch(`http://localhost:8000/notes/${note_id}`)
      let data = await response.json()
      setNote(data)
    }

    const createNote = async () => {
      await fetch(
        `http://localhost:8000/notes/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...note, updated: new Date()}) 
        }
      )
    }

    const updateNote = async () => {
      await fetch(
        `http://localhost:8000/notes/${note_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({...note, updated: new Date()}) 
        }
      )
    }

    const deleteNote = async () => {
      await fetch(
        `http://localhost:8000/notes/${note_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        navigate("/")
    }

    const handleSubmit = () => {
      if (note_id !== 'new' && !note?.body){
        deleteNote()
      } else if (note_id !== 'new'){
        updateNote()
      } else if (note_id === 'new' && note !== null && note?.body){
        createNote()
      }
      navigate("/")
    }
  return (
    <div className='note'>
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {
          note_id === 'new' ? (
            <button onClick={handleSubmit}>Done</button>
          ) : (
            <button onClick={deleteNote}>Delete</button>
          )
        }
        
      </div>

      <textarea
        value={note?.body}
        onChange={(e) => setNote({...note, body:e.target.value})}>

      </textarea>
    </div>
  )
}

export default NotePage