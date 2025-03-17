import React from 'react'
import './Button.css'

interface ButtonProps {
    buttonText: string;
    color: 'black' | 'blue';
    onClick?: () => void;
    span?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ buttonText, color, onClick, span }) => {
  return (
    <div className={`${span ? 'w-full' : ''} ${color === 'black' ? 'button-hover-black' : 'button-hover-blue'} p-4 flex justify-center items-center ${color === 'black' ? 'bg-black' : 'bg-itkool'} hover:cursor-pointer`} onClick={onClick}>
        <p className="text-xl text-center text-large-bold px-8 text-white">{buttonText}</p>
    </div>
  )
}
