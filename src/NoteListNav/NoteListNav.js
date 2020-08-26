import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import './NoteListNav.css'

import NotefulContext from '../NotefulContext'
import Button from '../Button/Button'

export default class NoteListNav extends Component {
  static contextType = NotefulContext;


  render() {
    const { folders=[] } = this.context

    return (
      <div className='NoteListNav'>
        <div className='NoteListNav__button-wrapper'>
            <Button
              
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              Add Folder
            </Button>
          </div>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                aria-controls="note__list"
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
