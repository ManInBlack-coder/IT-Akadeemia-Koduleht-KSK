import { useState, useEffect } from "react"
import arrow_down from "../assets/icons/arrow-down.svg"
import { TimetableItem } from "./TimetableItem"
import { ConsultationItem } from "./ConsultationItem"
interface TableProps {
  type: 'timetable' | 'consultations',
  data: any
}

export const Table: React.FC<TableProps> = ({ type, data }) => {

  const days: string[] = ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede"]
  const times: string[] = ["8:30-10:00", "10:15-11:45", "11:55-14:00", "14:10-15:40", "15:45-17:15"]

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-center items-center gap-2 mb-2 border border-black p-2">
            <button className="p-1">&lt;</button>
            <span className="text-lg">20.01-26.01 2025</span>
            <button className="p-1">&gt;</button>
        </div>


      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2"></th>
            {days.map((day: string) => (
              <th className="border p-4 text-left text-base-regular">
                <p className="flex items-center gap-2">{day} <img src={arrow_down} alt="arrow_down" className="w-4 h-4"/></p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time: string) => (
            <tr>
              <td className="border p-4 text-left text-base-regular">
                <p>{time}</p>
              </td>
              {days.map((day:string) => (
                <td className="border p-4 text-left text-base-regular">
                  {type === 'timetable' ? <TimetableItem title={data[day][time]} room={data[day][time]} building={data[day][time]}/> : <ConsultationItem/>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}