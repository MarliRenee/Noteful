import React from 'react'
import './AddButton.css'

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
  
}

AddButton.defaultProps ={
  tag: 'a',
}
