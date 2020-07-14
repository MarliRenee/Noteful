import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './Note.css'

export default function Note(props) {

  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'>
        {' '}
        remove
      </button>
    </div>
  )
}


Note.propTypes = {
  name: PropTypes.string.isRequired,
  
};

