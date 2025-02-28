import React from 'react'

interface ButtonProps {
    buttonText: string;
}

export const Button: React.FC<ButtonProps> = ({ buttonText }) => {
  return (
    <div className="p-4 flex justify-center items-center bg-">
        <p className="text-xl font-bold text-white">{buttonText}</p>
    </div>
  )
}
