import React from 'react'
import AddButton from '../AddButton/AddButton'
import PropType from 'prop-types'
import './NotePageNav.css'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <AddButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        Back
      </AddButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}

NotePageNav.propTypes = {
  history: PropType.object.isRequired,
  folder: PropType.object.isRequired,
};
