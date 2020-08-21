import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import EditNote from '../EditNote/EditNote'
import NotefulError from '../NotefulError'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    newFolder: {
      hasError: false,
      touched: false,
      name: '',
    },
    newNote: {
      name: {
        touched: false,
        value: '',
      },
      folderId: {
        touched: false,
        value: '',
      },
      content: {
        touched: false,
        value: '',
      },
    },
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}api/notes`, {
        method: 'GET',
        //body: JSON.stringify(note),
        headers: {
          'content-type': 'application/json',
          'Authorization': `${process.env.API_TOKEN}`
        }
      }),
      fetch(`${config.API_ENDPOINT}api/folders`, {
        method: 'GET',
        //body: JSON.stringify(newFolder),
        headers: {
          'content-type': 'application/json',
          'Authorization': `${process.env.API_TOKEN}`
        }
      })
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([notesRes.json(), foldersRes.json()])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  updateNewFolderName = name => {
    this.setState({
      newFolder: {
        hasError: false,
        touched: true,
        name: name,
      },
    })
  }

  updateNewNoteData = (input, value) => {
    this.setState({
      newNote: {
          ...this.state.newNote,
        [input]: {
          touched: true,
          value: value,
        },
      },
    })
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    })
  }

  handleDeleteNote = noteId => {
    console.log('Firing!')
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId),
    });
  }

  updateNote = () => {};

  renderNavRoutes() {
    return (
      <>
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
        {['/', 'api/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
        <Route path='/edit/:noteId' component={EditNote}/>
        {['/', 'api/folder/:folderId'].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
      </>
    )
  }

  render() {
    console.log(this.state);
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      updateNote: this.updateNote,
      addFolder: this.handleAddFolder,
      newFolder: this.state.newFolder,
      updateNewFolderName: this.updateNewFolderName,
      newNote: this.state.newNote,
      handleAddNote: this.handleAddNote,
      updateNewNoteData: this.updateNewNoteData
    }
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <NotefulError>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{' '}
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App