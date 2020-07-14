import React from 'react';
import './AddButton.css';
import PropType from 'prop-types';

export default function AddButton(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['AddButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

AddButton.propTypes = {
  tag: PropType.string.isRequired,
}

AddButton.defaultProps ={
  tag: 'a',
}
