import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'

class Note extends React.Component {
  
  static defaultProps = { 
    history: { goBack: () => {}, }, 
  };

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(noteId)

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
          this.context.deleteNote(noteId);
          this.props.history.push("/");
          //this.props.history.goBack();
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    console.log(this.context.deleteNote);
    const { name, id, modified } = this.props
    console.log(modified);

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
          onClick={this.handleClickDelete}
        >
          {' '}
          delete
        </button>
        
          <div className = 'noteDate'>
            <div className = 'modifiedDate'>
                Modified 
                {' '}
                <span className = 'Date'>
                    {modified}
                </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Note);

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}

