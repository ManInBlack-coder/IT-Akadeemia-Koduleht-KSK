import { useState } from "react";
import arrow_down from "../assets/icons/arrow-down.svg";
import { TimetableItem } from "./TimetableItem";
import { ConsultationItem } from "./ConsultationItem";

interface TableProps {
  type: 'timetable' | 'consultations';
  data: ScheduleType[];
  title: string | undefined;
  week: string;
  setWeek: React.Dispatch<React.SetStateAction<string>>;
}

// Creates an array of dates for the week starting from Monday
const createWeekDaysArray = (mondayDate: string): string[] => {
  const monday = new Date(mondayDate);
  const weekDays: string[] = [];
  
  // Generate dates for Monday through Friday
  for (let i = 1; i < 6; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    
    // Format the date as YYYY-MM-DD and add to array
    const formattedDate = currentDate.toISOString().split('T')[0];
    weekDays.push(formattedDate);
  }
  
  return weekDays;
};

export const Table: React.FC<TableProps> = ({ week, setWeek, type, data, title }) => {
  const days: string[] = createWeekDaysArray(week);
  const dayNames: string[] = ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede"];
  const times: {[key: string]: string} = data.length > 0 ? data[0].ajad : {};

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex justify-center items-center gap-2 bg-white border p-4 relative">
        <h1 className="absolute left-5 top-5 text-heading6-bold text-black text-center">{title ? title : "Tunniplaan"}</h1>
        <button className="p-1" onClick={() => setWeek(new Date(new Date(week).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}>&lt;</button>
        <span className="text-lg">{new Date(week).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(new Date(week).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
        <button className="p-1" onClick={() => setWeek(new Date(new Date(week).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}>&gt;</button>
      </div>

      <table className="w-full border-collapse border border-gray-300 bg-white table-fixed">
        <thead>
          <tr className="bg-white">
            <th className="border w-1/12"></th>
            {dayNames.map((day: string, dayIndex: number) => (
              <th key={dayIndex} className="border p-4 text-left text-base-regular w-1/6">
                <p className="flex items-center">{day} <img src={arrow_down} alt="arrow_down"/></p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data[0]?.tunnid).length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-base-regular">
                Selle nädala tunniplaan pole veel saadaval.
              </td>
            </tr>
          ) : (
            Object.keys(times).map((time: string) => {
              const isRowEmpty = days.every((day: string) => {
                const item = data[0]?.tunnid?.[day]?.find((item) => item.tund === time);
                return !item || (type === 'timetable' && !item.aine);
              });

              if (isRowEmpty) return null;

              return (
                <tr key={time}>
                  <td className="border p-4 text-left text-base-regular w-1/6">
                    <p className="text-base-medium text-[#677083]">{times[time]}</p>
                  </td>
                  {days.map((day: string, dayIndex: number) => (
                    <td key={dayIndex} className="border p-4 text-left text-base-regular w-1/6">
                      {type === 'timetable' ? (
                        <TimetableItem
                          teacher={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.opetaja || ""}
                          title={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.aine || ""}
                          room={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.ruum || ""}
                        />
                      ) : (
                        <ConsultationItem />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}