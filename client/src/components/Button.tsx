import React from 'react'
import './Button.css'

interface ButtonProps {
    buttonText: string;
    color: 'black' | 'blue';
}

export const Button: React.FC<ButtonProps> = ({ buttonText, color }) => {
  return (
    <div className={`button-hover p-4 flex justify-center items-center ${color === 'black' ? 'bg-black' : 'bg-itkool'} hover:cursor-pointer`}>
        <p className="text-xl text-large-bold px-8 text-white">{buttonText}</p>
    </div>
  )
}
