import React from 'react'

type Props = {
    children: React.ReactNode,
    color: string,
    opacity: number,
    onClick: () => void
}

const Button = ({children, color, opacity}: Props) => {
    let buttonStyles = `bg-${color}-${opacity} py-1 px-2 rounded-sm text-white`
  return (
    <button
        type='submit'
        className={buttonStyles}
    >
        {children}
    </button>
  )
}

export default Button