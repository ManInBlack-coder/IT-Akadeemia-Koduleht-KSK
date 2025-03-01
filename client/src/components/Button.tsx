import React from 'react'
import './Button.css'

interface ButtonProps {
    buttonText: string;
}

export const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <div className="button-hover p-4 flex justify-center items-center bg-itkool hover:cursor-pointer">
        <p className="text-xl text-large-bold px-8 text-white">{buttonText}</p>
    </div>
  )
}
