import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'
import ApiContext from '../ApiContext'
// import config from '../config'
import '../Note/Note.css'

fontawesome.library.add(faCheckSquare, faCoffee);

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;


  handleClickDelete = (e) => {
    
    e.preventDefault();
    const noteId = this.props.id
    // console.log(noteId);
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(data => {
        // console.log(data)
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={(e) => this.handleClickDelete(e)}
        >
          <FontAwesomeIcon 
          icon='trash-alt' 
          // icon='faCheckSquare'
          />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'DD/MMM/YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}