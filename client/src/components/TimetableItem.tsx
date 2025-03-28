import React from 'react'

interface TimetableItemProps {
  title: string
  room: string
  teacher: string;
  time?: string;
}

// Funktsioon, mis muudab esimese tähe suureks
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const TimetableItem: React.FC<TimetableItemProps> = ({ title, room, teacher, time }) => {
  return (
    <div className="flex flex-col gap-2 md:gap-0 items-center md:items-start justify-start h-full w-full overflow-hidden">
    <b className="text-center md:text-left">{capitalizeFirstLetter(title.length > 40 ? title.slice(0, 80) + "..." : title)}</b> 

      <p className="text-center md:text-left">{teacher.length > 40 ? teacher.slice(0, 50) + "..." : teacher}</p>
      <p className="text-center md:text-left">{room}</p>
      <p className="md:hidden text-base-medium">{time}</p>
    </div>
  )
}
