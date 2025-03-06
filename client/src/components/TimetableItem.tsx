import React from 'react'

interface TimetableItemProps {
  title: string
  room: string
  teacher: string
}

export const TimetableItem: React.FC<TimetableItemProps> = ({ title, room, teacher }) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <b>{title}</b>
      <p>{teacher}</p>
      <p>{room}</p>
    </div>
  )
}
