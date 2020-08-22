import React from 'react';
import PropTypes from 'prop-types';

import './NotePageNav.css';

import { findNote, findFolder } from '../notes-helpers';
import Button from '../Button/Button';
import NotefulContext from '../NotefulContext';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render () {
    const { notes, folders } = this.context
    const { noteId } = this.props.match.params
    const note = findNote( notes, noteId ) || {}
    const folder = findFolder( folders, note.folderId)
    
    return (
      <div className='NotePageNav'>
        <Button
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <br />
          Back
        </Button>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }

}

NotePageNav.propType = {
  push: PropTypes.func.isRequired
};