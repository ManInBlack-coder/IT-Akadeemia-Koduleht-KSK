import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import sampleConsultations from './sampleConsultations.json'

//https://siseveeb.voco.ee/veebilehe_andmed/konsultatsioonid?hoone=KPL&aasta=2024&periood=1&nadal=2024-03-18

interface ScheduleItem {
  tund: string;
  opetaja: string;
  aine: string;
  ruum: string;
  algus: string;
  lopp: string;
  grupp: string;
}

interface ScheduleType {
  nadal: string;
  ajad: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    soomine: string;
  };
  tunnid: {
    [key: string]: ScheduleItem[];
  };
}

interface KonsultatsioonType {
  opetaja: string;
  oppeaine: string;
  paev: string;
  aeg: string;
  kuupaevad: string[];
  ruum: string;
  lisainfo: string | null;
  tegevus: string;
}

interface KonsultatsioonidData {
  aasta: number;
  periood: string;
  konsultatsioonid: KonsultatsioonType[];
}

const convertToScheduleType = (konsultatsioonid: KonsultatsioonidData, currentWeek: string, filters: {
  teacher: string;
  date: string;
  time: string;
}): ScheduleType => {
  console.log("Converting to schedule with filters:", filters);
  console.log("Current week:", currentWeek);

  const schedule: ScheduleType = {
    nadal: currentWeek,
    ajad: {
      "1": "8:30-10:00",
      "2": "10:15-11:45",
      "3": "12:15-13:45",
      "4": "14:00-15:30",
      "5": "15:45-17:15",
      "6": "17:30-19:00",
      "7": "19:15-20:45",
      "8": "21:00-22:30",
      "9": "22:45-00:15",
      soomine: "11:45-12:15"
    },
    tunnid: {}
  };

  // Arvutame nädala alguse ja lõpu kuupäevad
  const weekStart = new Date(currentWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  console.log("Week range:", { 
    weekStart: weekStart.toISOString().split('T')[0], 
    weekEnd: weekEnd.toISOString().split('T')[0] 
  });

  // Loome tühjad päevad nädalas
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    schedule.tunnid[dateStr] = [];
  }

  // Filtreerime konsultatsioonid
  let filteredConsultations = [...konsultatsioonid.konsultatsioonid];

  if (filters.teacher) {
    filteredConsultations = filteredConsultations.filter(k => k.opetaja === filters.teacher);
  }

  if (filters.time) {
    filteredConsultations = filteredConsultations.filter(k => k.aeg.startsWith(filters.time));
  }

  if (filters.date) {
    const [startStr, endStr] = filters.date.split('-');
    const start = new Date(startStr.split('.').reverse().join('-'));
    const end = new Date(endStr.split('.').reverse().join('-'));

    console.log("Date filter range:", { 
      start: start.toISOString().split('T')[0], 
      end: end.toISOString().split('T')[0] 
    });

    filteredConsultations = filteredConsultations.filter(k => 
      k.kuupaevad.some(date => {
        const current = new Date(date);
        return current >= start && current <= end;
      })
    );
  }

  console.log("Filtered consultations:", filteredConsultations);

  // Lisame filtreeritud konsultatsioonid tunniplaani
  filteredConsultations.forEach(k => {
    k.kuupaevad.forEach(date => {
      const consultationDate = new Date(date);
      
      // Kontrollime, kas konsultatsioon toimub valitud nädalal või on valitud kuupäevavahemikus
      const isInSelectedWeek = consultationDate >= weekStart && consultationDate <= weekEnd;
      const isInSelectedDateRange = filters.date ? true : false; // Kui kuupäev on valitud, siis juba filtreerisime

      if (isInSelectedWeek || isInSelectedDateRange) {
        if (!schedule.tunnid[date]) {
          schedule.tunnid[date] = [];
        }

        const [startTime] = k.aeg.split('-');
        let tundId = "1";

        // Otsime täpset aega
        for (const [id, timeRange] of Object.entries(schedule.ajad)) {
          if (timeRange.startsWith(startTime)) {
            tundId = id;
            break;
          }
        }

        schedule.tunnid[date].push({
          tund: tundId,
          opetaja: k.opetaja,
          aine: k.oppeaine,
          ruum: k.ruum,
          algus: k.aeg.split('-')[0],
          lopp: k.aeg.split('-')[1] || k.aeg.split('-')[0],
          grupp: ''
        });
      }
    });
  });

  console.log("Final schedule:", schedule);
  return schedule;
};

export const Konsultatsioonid = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const formattedDate = firstDayOfWeek.toISOString().split('T')[0];
  
  const [week, setWeek] = useState<string>(formattedDate)
  const [selectedTeacher, setSelectedTeacher] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [hoone, setHoone] = useState<string>("KPL")
  const [isLoading, setIsLoading] = useState(true)
  const [timetableData, setTimetableData] = useState<ScheduleType | undefined>()
  const [teachers, setTeachers] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<{
    teacher: string;
    date: string;
    time: string;
  }>({
    teacher: "",
    date: "",
    time: ""
  });

  const hooneOptions = [
    { value: "KPL", label: "Kopli" },
    { value: "POL", label: "Põhja" },
    { value: "STR", label: "Sõpruse" },
    { value: "STR2", label: "Sõpruse 2" },
    { value: "ALL", label: "Kõik" }
  ]

  // Genereeri kuupäevavahemikud JSON failis olevatest kuupäevadest
  const getDateRanges = () => {
    let dates: string[] = [];
    
    if (selectedTeacher) {
      // Kui õpetaja on valitud, võtame ainult tema konsultatsioonide kuupäevad
      dates = [...new Set(sampleConsultations.konsultatsioonid
        .filter(k => k.opetaja === selectedTeacher)
        .flatMap(k => k.kuupaevad))].sort();
    } else {
      // Kui õpetajat pole valitud, võtame kõik kuupäevad
      dates = [...new Set(sampleConsultations.konsultatsioonid
        .flatMap(k => k.kuupaevad))].sort();
    }
    
    const ranges: string[] = [];
    
    if (dates.length > 0) {
      let currentStart = new Date(dates[0]);
      let currentEnd = new Date(dates[0]);
      
      dates.forEach((date, index) => {
        const currentDate = new Date(date);
        if (index > 0) {
          const prevDate = new Date(dates[index - 1]);
          const dayDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayDiff > 7) {
            // Lisa eelmine vahemik
            ranges.push(`${currentStart.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}-${currentEnd.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`);
            currentStart = currentDate;
          }
          currentEnd = currentDate;
        }
      });
      
      // Lisa viimane vahemik
      ranges.push(`${currentStart.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}-${currentEnd.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`);
    }
    
    return ranges;
  };

  // Funktsioon saadaval olevate kellaaegade leidmiseks
  const getAvailableTimes = () => {
    if (!selectedTeacher) {
      return [];
    }

    let konsultatsioonid = sampleConsultations.konsultatsioonid
      .filter(k => k.opetaja === selectedTeacher);

    if (selectedDate) {
      const [startStr, endStr] = selectedDate.split('-');
      const start = new Date(startStr.split('.').reverse().join('-'));
      const end = new Date(endStr.split('.').reverse().join('-'));

      konsultatsioonid = konsultatsioonid.filter(k => 
        k.kuupaevad.some(date => {
          const current = new Date(date);
          return current >= start && current <= end;
        })
      );
    }

    // Võtame unikaalsed kellaajad
    const times = [...new Set(konsultatsioonid.map(k => k.aeg.split('-')[0]))].sort();
    return times;
  };

  // Tühjendame kuupäeva valiku kui õpetaja muutub
  useEffect(() => {
    setSelectedDate("");
  }, [selectedTeacher]);

  // Tühjendame kellaaja valiku kui õpetaja või kuupäev muutub
  useEffect(() => {
    setSelectedTime("");
  }, [selectedTeacher, selectedDate]);

  // Uuendame tabelit, kui nädal muutub
  useEffect(() => {
    setIsLoading(true);
    const newData = convertToScheduleType(sampleConsultations, week, activeFilters);
    setTimetableData(newData);
    setIsLoading(false);
  }, [week, activeFilters]);

  // Laeme õpetajate nimekirja
  useEffect(() => {
    setTeachers([...new Set(sampleConsultations.konsultatsioonid.map((k: KonsultatsioonType) => k.opetaja))].sort());
  }, []);

  // Otsingu funktsioon
  const handleSearch = () => {
    console.log("Searching with filters:", { selectedTeacher, selectedDate, selectedTime });
    
    // Kui kuupäev on valitud, uuendame nädalat vastavalt valitud kuupäevale
    if (selectedDate) {
      const [startStr] = selectedDate.split('-');
      const startDate = new Date(startStr.split('.').reverse().join('-'));
      
      // Leiame nädala alguse (esmaspäev)
      const dayOfWeek = startDate.getDay() || 7; // 0 on pühapäev, 7 on esmaspäev
      const mondayDate = new Date(startDate);
      mondayDate.setDate(startDate.getDate() - dayOfWeek + 1);
      
      const formattedMonday = mondayDate.toISOString().split('T')[0];
      console.log("Setting week to:", formattedMonday);
      setWeek(formattedMonday);
    }
    
    setActiveFilters({
      teacher: selectedTeacher,
      date: selectedDate,
      time: selectedTime
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen justify-start items-center">
        <div className="w-full">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-heading2-bold mb-8">Õpetajate konsultatsioonid</h1>
            <div className="text-center">Laadin andmeid...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center">
      <div className="w-full">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-heading1-bold text-center mb-12">ÕPETAJATE KONSULTATSIOONID</h1>
          
          {/* Filtrid */}
          <div className="flex gap-4 mb-8 justify-center">
            <select 
              value={hoone}
              onChange={(e) => setHoone(e.target.value)}
              className="border bg-white border-gray-300 p-2 rounded min-w-[120px]"
            >
              {hooneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select 
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="border bg-white border-gray-300 p-2 rounded min-w-[200px]"
            >
              <option value="">Vali õpetaja</option>
              {teachers.map((teacher) => (
                <option key={teacher} value={teacher}>{teacher}</option>
              ))}
            </select>

            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border bg-white border-gray-300 p-2 rounded min-w-[200px]"
            >
              <option value="">Vali kuupäev</option>
              {getDateRanges().map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>

            <select 
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border bg-white border-gray-300 p-2 rounded min-w-[120px]"
            >
              <option value="">Vali aeg</option>
              {getAvailableTimes().map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>

            <button 
              onClick={handleSearch}
              className="bg-black text-white px-8 py-2 rounded hover:bg-blue-700"
            >
              Otsi
            </button>
          </div>

          {/* Aktiivsed filtrid */}
          {(activeFilters.teacher || activeFilters.date || activeFilters.time) && (
            <div className="mb-4 text-center">
              <p className="text-gray-600">
                Aktiivsed filtrid: 
                {activeFilters.teacher && <span className="ml-2 bg-gray-200 px-2 py-1 rounded mr-2">Õpetaja: {activeFilters.teacher}</span>}
                {activeFilters.date && <span className="bg-gray-200 px-2 py-1 rounded mr-2">Kuupäev: {activeFilters.date}</span>}
                {activeFilters.time && <span className="bg-gray-200 px-2 py-1 rounded">Aeg: {activeFilters.time}</span>}
                <button 
                  onClick={() => {
                    // Lähtestame filtrid
                    setActiveFilters({ teacher: "", date: "", time: "" });
                    setSelectedTeacher("");
                    setSelectedDate("");
                    setSelectedTime("");
                    
                    // Lähtestame nädala praegusele nädalale
                    const today = new Date();
                    const dayOfWeek = today.getDay() || 7; // 0 on pühapäev, 7 on esmaspäev
                    const mondayDate = new Date(today);
                    mondayDate.setDate(today.getDate() - dayOfWeek + 1);
                    const formattedMonday = mondayDate.toISOString().split('T')[0];
                    console.log("Resetting week to current week:", formattedMonday);
                    setWeek(formattedMonday);
                  }}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200 flex items-center inline-flex"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Tühista filtrid
                </button>
              </p>
            </div>
          )}

          {/* Teade, kui tulemusi pole */}
          {timetableData && Object.values(timetableData.tunnid).every(arr => arr.length === 0) && (
            <div className="text-center text-gray-600 my-4">
              Valitud filtritega konsultatsioone ei leitud.
            </div>
          )}

          {/* Table Component */}
          {timetableData && (
            <Table 
              type="consultations"
              data={[timetableData]}
              title="Konsultatsioonid"
              week={week}
              setWeek={setWeek}
            />
          )}
        </div>
      </div>
    </div>
  )
};
