import React from 'react'

function Button(props) {

const { className,textColor, children, ...rest } = props;
  return (
    <button className={`px-4 py-2 rounded-lg ${textColor} ${className} `}{...rest}> {children} </button>
  )
}

export default Button