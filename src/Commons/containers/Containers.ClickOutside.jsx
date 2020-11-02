import React, { useRef, useEffect } from 'react'

export const ClickOutside = props => {
  const { children, onClickOutisde, className } = props
  const outRef = useRef()

  const handleClickOutside = e => {
    if (outRef.current && !outRef.current.contains(e.target)) {
      onClickOutisde()
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Escape') onClickOutisde()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div ref={outRef} className={className} data-testid="containerClickOutside">
      {children}
    </div>
  )
}
