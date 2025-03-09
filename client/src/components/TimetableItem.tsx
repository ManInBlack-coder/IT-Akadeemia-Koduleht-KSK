import React from 'react'

interface TimetableItemProps {
  title: string
  room: string
  teacher: string;
}

export const TimetableItem: React.FC<TimetableItemProps> = ({ title, room, teacher }) => {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full">
      <b>{title.length > 40 ? title.slice(0, 80) + "..." : title}</b>
      <p>{teacher.length > 40 ? teacher.slice(0, 50) + "..." : teacher}</p>
      <p>{room}</p>
    </div>
  )
}
