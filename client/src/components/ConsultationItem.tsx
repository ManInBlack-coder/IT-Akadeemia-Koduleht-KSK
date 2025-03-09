import React from 'react'

interface ConsultationItemProps {
  teacher: string;
  subject: string;
  room: string;
  additionalInfo: string | null;
  time: string;
}

export const ConsultationItem: React.FC<ConsultationItemProps> = ({ 
  teacher, 
  subject, 
  room, 
  additionalInfo,
  time
}) => {
  return (
    <div className="flex flex-col items-center md:items-start justify-center w-full gap-1 text-center md:text-left">
      <div className="flex flex-col items-center md:items-start">
        <span className="font-bold text-base">{subject}</span>
        <span className="text-sm">{teacher}</span>
        <span className="text-sm text-gray-600">{room}</span>
        <span className="text-sm text-gray-600">{time}</span>
      </div>
      {additionalInfo && (
        <div className="mt-2 text-center md:text-left">
          <span className="text-xs text-gray-500 italic">{additionalInfo}</span>
        </div>
      )}
    </div>
  )
}
