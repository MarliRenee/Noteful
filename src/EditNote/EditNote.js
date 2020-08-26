import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './EditNote.css'

export default class EditNote extends React.Component {
  static contextType = ApiContext

  editNote = note => {
    
    note.modified = new Date(note.modified);

    fetch(`${config.API_ENDPOINT}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.API_TOKEN}`
      },
      body: JSON.stringify(note),
    })
      .then(res => {
        return res.json()
      })
      .then(resJSON => this.context.handleEditNote(resJSON))
  }

  parseFolders = () => {
    return this.context.folders.map(folder => (
      <option key={folder.id} name={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ))
  }

  handleFormSubmit = e => {
    e.preventDefault(e)
    const { noteId } = this.props.match.params
    const { name, content, folderId } = this.state;
    const editNote = {
      name: e.name.title.value,
      content: e.target.content.value,
      folderId: e.target.folders.value,
      modified: new Date(),
    }

    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'PATCH',
      body: JSON.stringify(editNote),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${process.env.API_TOKEN}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(editNote)
        this.context.updateNote(editNote)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })

    this.props.history.push('/');
  }

  validateName = () => {
    if (this.context.editNote.name.value.length === 0) {
      return '*Name is required'
    }
  }

  validateDescription = () => {
    if (this.context.editNote.content.value.length === 0) {
      return '*Description is required'
    }
  }

  render() {

    return (
      <div className="EditNote">
        <header>
          <h2 className="edit-note-header">Edit A Note</h2>
        </header>

        <form
          className="edit-note-form"
          onSubmit={e => this.handleFormSubmit(e)}
          >

          <div className="Name">
            <label htmlFor="name">
              Name
              {this.context.newNote.name.touched && <p>{this.validateName()}</p>}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              aria-required="true"
              aria-label="Name"
              onChange={e =>
                this.context.updateNewNoteData(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="Content">
            <label htmlFor="content">
              Description
              {this.context.newNote.content.touched && (
                <p>{this.validateDescription()}</p>
              )}
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              aria-required="true"
              aria-label="Description"
              onChange={e =>
                this.context.updateNewNoteData(e.target.name, e.target.value)
              }
            />
          </div>

          <div className="Folders">
            <label htmlFor="folders">Select a Folder</label>
            <select
              name="folders"
              id="folders"
              aria-required="true"
              aria-label="Select a folder"
            >
              {this.parseFolders()}
            </select>
          </div>

          <div className='EditNote_buttons'>
            <button 
                id='cancel_button' 
                type='button' 
                onClick={this.handleClickCancel}
              >
              Cancel
            </button>
            <button
              id="save_button" 
              type='submit'
            >
              Edit note
            </button>
          </div>
        </form>
      </div>
    )
  }
}