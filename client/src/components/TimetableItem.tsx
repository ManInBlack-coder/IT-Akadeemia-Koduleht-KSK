import React from 'react'

interface TimetableItemProps {
  title: string
  room: string
  building: string
}

export const TimetableItem: React.FC<TimetableItemProps> = ({ title, room, building }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{room}</p>
      <p>{building}</p>
    </div>
  )
}
