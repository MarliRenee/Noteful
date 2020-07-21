import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import AddButton from '../AddButton/AddButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <div className='NoteListNav__button-wrapper'>
          <AddButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <br />
            Folder
          </AddButton>
        </div>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    )
  }
}