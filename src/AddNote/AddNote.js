import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError';
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      noteName: {
        value: '',
        touched: false
      },
      noteContent: {
        value: '',
        touched: false
      },
      noteFolder: {
        value: '',
        touched: false
      }
    };  
  }

  // static defaultProps = {
  //   history: {
  //     push: () => { }
  //   },
  // }
  static contextType = ApiContext;

  updateNoteName(noteName) {
    this.setState({noteName: { value: noteName, touched: true} });
  }

  updateNoteContent(noteContent) {
    this.setState({noteContent: { value: noteContent, touched: true}});
  }

  updateNoteFolder(noteFolder) {
    this.setState({noteFolder: { value: noteFolder, touched: true}});
  }

  handleSubmit = e => {
    e.preventDefault()
    const { noteName, noteContent, noteFolder } = this.state;
    const newNote = {
      name: noteName.value,
      content: noteContent.value,
      folderId: noteFolder.value,
    }
   
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
      console.log("Note name: ", noteName.value)
      console.log("Note content: ", noteContent.value)
      console.log("Note folder: ", noteFolder.value)
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  validateNoteName() {
    const noteName = this.state.noteName.value.trim();
    if (noteName.length === 0) {
      return '* A note name is required';
    } else if (noteName.length < 3) {
      return '* The note name must be at least 3 characters long';
    }
  } 

  validateNoteContent() {
    const noteContent = this.state.noteContent.value.trim();
    if (noteContent.length === 0) {
      return '* Note content is required';
    }
  }

  validateNoteFolder() {
    const noteFolder = this.state.noteFolder.value.trim();
    if (noteFolder.length === 0) {
      return '* A folder selection is required'
    }
  }

  render() {
    const noteNameError = this.validateNoteName();
    const noteContentError = this.validateNoteContent();
    const noteFolderError = this.validateNoteFolder();
    const { folders=[] } = this.context
    
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          
          <div className='field'>
            <label htmlFor='noteName'>
              Name
            </label>
            <input 
              type='text' 
              id='noteName' 
              name='noteName' 
              onChange={e => this.updateNoteName(e.target.value)}
              />
              {this.state.noteName.touched && (
                <ValidationError message={noteNameError} />
              )}
          </div>
         
          <div className='field'>
            <label htmlFor='noteContent'>
              Content
            </label>
            <textarea 
              id='noteContent' 
              name='noteContent'
              onChange={e => this.updateNoteContent(e.target.value)} 
            />
            {this.state.noteContent.touched && (
              <ValidationError message={noteContentError} />
            )}
          </div>
          
          <div className='field'>
            <label htmlFor='noteFolder'>
              Folder
            </label>
            <select 
              id='noteFolder' 
              name='noteFolder'
              onChange={e => this.updateNoteFolder(e.target.value)} 
              >
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name} 
                </option>
              )}
            </select>
            {this.state.noteFolder.touched && (
              <ValidationError message={noteFolderError} />
            )}
          </div>
          
          <div className='AddNote_buttons'>
            <button 
              id='cancel_button' 
              type='button' 
              onClick={this.handleClickCancel}
            >
            Cancel
            </button>
            {' '}
            <button
              id="save_button" 
              type='submit'
              disabled={
                this.validateNoteName() ||
                this.validateNoteContent() ||
                this.validateNoteFolder()
              }
            >
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}