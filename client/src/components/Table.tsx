import React, { useState } from "react";
import arrow_down from "../assets/icons/arrow-down.svg";
import { TimetableItem } from "./TimetableItem";
import { ConsultationItem } from "./ConsultationItem";
import angle_right from "../assets/icons/angle-bracket-right.svg";

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
  for (let i = 0; i < 5; i++) {
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
  const times: {[key: string]: string} = {
    "1": "07:00-08:30",
    "2": "08:30-10:15",
    "3": "10:15-11:55",
    "4": "11:55-14:00",
    "5": "14:00-15:45",
    "6": "15:45-17:20"
  };

  const generateColor = (title: string): string => {
    if(title.length > 0){
      const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
      const color = `hsl(${hash % 360}, 80%, 90%)`;
      return color;
    }
    return "white";
  };

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white border p-4 relative">
        <h1 className="hidden md:block absolute left-5 top-5 text-heading6-bold text-black text-center">{title ? title : "Tunniplaan"}</h1>
        <div className="flex flex-row items-center justify-center gap-4">
          <button className="p-1" onClick={() => {
            const newWeek = new Date(new Date(week).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
            setWeek(newWeek)
          }}>
            <img src={angle_right} alt="arrow_left" className="rotate-180" />
          </button>
          <span className="text-lg">{new Date(week).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(new Date(week).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
          <button className="p-1" onClick={() => {
            const newWeek = new Date(new Date(week).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
            setWeek(newWeek)
          }}>
            <img src={angle_right} alt="arrow_right" />
          </button>
        </div>
      </div>
      {/* Desktop table */}
      <table className="hidden md:table w-full border-collapse border border-gray-300 bg-white table-fixed">
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

              // Konsultatsioonide puhul kuvame kõik read, isegi kui need on tühjad
              if (isRowEmpty && type === 'timetable') return null;

              return (
                <tr key={time}>
                  <td className="border p-4 text-left text-base-regular w-1/6">
                    <p className="text-base-medium text-[#677083]">{times[time]}</p>
                  </td>
                  {days.map((day: string, dayIndex: number) => (
                    <td key={dayIndex} className="border text-left text-base-regular w-1/6 p-4" style={{ backgroundColor: generateColor(data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.aine || "") }}>
                      {type === 'timetable' ? (
                        <TimetableItem
                          teacher={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.opetaja || ""}
                          title={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.aine || ""}
                          room={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.ruum || ""}
                        />
                      ) : (
                        data[0]?.tunnid?.[day]?.find((item) => item.tund === time) ? (
                          <ConsultationItem 
                            teacher={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.opetaja || ""}
                            subject={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.aine || ""}
                            room={data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.ruum || ""}
                            additionalInfo={null}
                            time={`${data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.algus || ""}-${data[0]?.tunnid?.[day]?.find((item) => item.tund === time)?.lopp || ""}`}
                          />
                        ) : (
                          <div className="flex flex-col items-center md:items-start justify-center w-full gap-1 text-center md:text-left">
                            <span className="text-sm text-gray-400"></span>
                          </div>
                        )
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {/* Mobile table */}
      <table className="md:hidden w-full border-collapse border border-gray-300 bg-white table-fixed">
        <tbody>
          {Object.keys(data[0]?.tunnid).length === 0 ? (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-base-regular">
                Selle nädala tunniplaan pole veel saadaval.
              </td>
            </tr>
          ) : days.map((day, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="border text-small-bold p-4 bg-white text-center">
                  {dayNames[index]}
                </td>
              </tr>
              {Object.keys(times).map((time: string) => {
                const item = data[0]?.tunnid?.[day]?.find((item) => item.tund === time);
                
                // Konsultatsioonide puhul ei kuva tühje ridu
                if (!item) return null;
                
                // Tunniplaani puhul ei kuva tühje ridu
                if (type === 'timetable' && !item.aine) return null;

                return (
                  <tr key={`${day}-${time}`}>
                    <td className="border text-left text-base-regular w-full p-4" style={{ backgroundColor: generateColor(item?.aine || "") }}>
                      {type === 'timetable' ? (
                        <TimetableItem
                          teacher={item?.opetaja || ""}
                          title={item?.aine || ""}
                          room={item?.ruum || ""}
                          time={times[time]}
                        />
                      ) : (
                        <ConsultationItem 
                          teacher={item.opetaja || ""}
                          subject={item.aine || ""}
                          room={item.ruum || ""}
                          additionalInfo={null}
                          time={`${item.algus || ""}-${item.lopp || ""}`}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}