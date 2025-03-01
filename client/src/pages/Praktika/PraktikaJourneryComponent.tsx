import React from 'react'

interface PraktikaJourneryComponentProps {
    number: string;
    title: string;
    body: string;
    bgColor: string;
}

export const PraktikaJourneryComponent: React.FC<PraktikaJourneryComponentProps> = ({ number, title, body, bgColor }) => {
  return (
    <div className={`flex flex-col items-start justify-start w-full bg-${bgColor}`}>
        <p className="text-heading2-bold w-full text-center">{number}</p>
        <h3 className='text-heading3-bold text-center w-full'>{title}</h3>
        <div>{body}</div>
    </div>
  )
}
