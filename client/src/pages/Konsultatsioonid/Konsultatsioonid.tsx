import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import axios from 'axios'
import { getApiUrl } from '../../utils/functions'
import vocoMuster from '../../assets/konsultatsioonid/VOCO_RGB_TAUST.svg'
//https://siseveeb.voco.ee/veebilehe_andmed/konsultatsioonid?hoone=KPL&aasta=2024&periood=1&nadal=2024-03-18

// Kohandatud ScheduleType tüüp konsultatsioonide jaoks
interface ScheduleType {
  nadal: string;
  ajad: {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
  };
  tunnid: {
    [key: string]: ScheduleItem[];
  };
}

// Kasutame ScheduleItem tüüpi index.d.ts failist
interface ScheduleItem {
  tund: string;
  opetaja: string;
  aine: string;
  ruum: string;
  algus: string;
  lopp: string;
  grupp: string;
}

// Kasutame KonsultatsioonType tüüpi index.d.ts failist
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

// Kasutame KonsultatsioonidData tüüpi index.d.ts failist
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
      "1": "07:00-08:30",
      "2": "08:30-10:15",
      "3": "10:15-11:55",
      "4": "11:55-14:00",
      "5": "14:00-15:45",
      "6": "15:45-17:20"
    },
    tunnid: {}
  };

  // Arvutame nädala alguse ja lõpu kuupäevad
  const weekStart = new Date(currentWeek);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 4); // 5 päeva (esmaspäevast reedeni)

  console.log("Week range:", { 
    weekStart: weekStart.toISOString().split('T')[0], 
    weekEnd: weekEnd.toISOString().split('T')[0] 
  });

  // Loome tühjad päevad nädalas (ainult tööpäevad)
  for (let i = 0; i < 5; i++) { // 5 päeva (esmaspäevast reedeni)
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
      
      // Kontrollime, kas konsultatsioon toimub tööpäeval (1-5, esmaspäev-reede)
      const dayOfWeek = consultationDate.getDay();
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

      if ((isInSelectedWeek && isWeekday) || isInSelectedDateRange) {
        if (!schedule.tunnid[date]) {
          schedule.tunnid[date] = [];
        }

        // Konsultatsiooni algusaeg (tundides)
        const [startTimeStr] = k.aeg.split('-');
        const [hours, minutes] = startTimeStr.split(':').map(Number);
        const startTime = hours + minutes / 60;

        // Leiame sobiva tunni ID vastavalt algusajale
        let tundId = "1"; // Vaikimisi esimene tund

        // Täpsem ajavahemike määramine
        if (startTime >= 7.0 && startTime < 8.5) {
          tundId = "1"; // 07:00-08:30
        } else if (startTime >= 8.5 && startTime < 10.25) {
          tundId = "2"; // 08:30-10:15
        } else if (startTime >= 10.25 && startTime < 11.92) {
          tundId = "3"; // 10:15-11:55
        } else if (startTime >= 11.92 && startTime < 14.0) {
          tundId = "4"; // 11:55-14:00
        } else if (startTime >= 14.0 && startTime < 15.75) {
          tundId = "5"; // 14:00-15:45
        } else if (startTime >= 15.75) {
          tundId = "6"; // 15:45-17:20
        }

        // Erijuhtumid
        // Kui konsultatsiooni algusaeg on 14:00-14:10 vahel, määrame selle 5. tundi
        if (startTime >= 14.0 && startTime < 14.17) {
          tundId = "5"; // 14:00-15:45
        }

        // Kui konsultatsiooni algusaeg on 8:00-8:30 vahel, määrame selle 1. tundi
        if (startTime >= 8.0 && startTime < 8.5) {
          tundId = "1"; // 07:00-08:30
        }

        // Kui konsultatsiooni algusaeg on 14:05-14:10 vahel, määrame selle 5. tundi
        if (startTime >= 14.08 && startTime < 14.17) {
          tundId = "5"; // 14:00-15:45
        }

        // Täpne kontroll pildil oleva konsultatsiooni jaoks (14:05-15:00)
        if (k.aeg === "14:05-15:00") {
          tundId = "5"; // 14:00-15:45
        }

        // Täpne kontroll pildil oleva konsultatsiooni jaoks (08:00-08:30)
        if (k.aeg === "08:00-08:30") {
          tundId = "1"; // 07:00-08:30
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
  const [hoone] = useState<string>("KPL")
  const [isLoading, setIsLoading] = useState(true)
  const [timetableData, setTimetableData] = useState<ScheduleType | undefined>()
  const [originalData, setOriginalData] = useState<KonsultatsioonidData | null>(null)
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

  // Genereeri kuupäevavahemikud JSON failis olevatest kuupäevadest
  const getDateRanges = () => {
    let dates: string[] = [];
    
    // Kasutame originaalandmeid või näidisandmeid
    const konsultatsioonid = originalData?.konsultatsioonid;
    
    if(konsultatsioonid) {
      if (selectedTeacher) {
        // Kui õpetaja on valitud, võtame ainult tema konsultatsioonide kuupäevad
        dates = [...new Set(konsultatsioonid
          .filter(k => k.opetaja === selectedTeacher)
          .flatMap(k => k.kuupaevad))].sort();
      } else {
        // Kui õpetajat pole valitud, võtame kõik kuupäevad
        dates = [...new Set(konsultatsioonid
          .flatMap(k => k.kuupaevad))].sort();
      }
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
    if (!selectedTeacher || !originalData?.konsultatsioonid) {
      return [];
    }

    let konsultatsioonid = originalData.konsultatsioonid
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
    axios.get(`${getApiUrl()}/veebilehe_andmed/konsultatsioonid?hoone=ALL`)
      .then(response => {
        const data = response.data as KonsultatsioonidData;
        setOriginalData(data);
        setTeachers([...new Set(data.konsultatsioonid.map((k: KonsultatsioonType) => k.opetaja))].sort());
        const newData = convertToScheduleType(data, week, activeFilters);
        setTimetableData(newData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching consultation data:", error);
        setIsLoading(false);
      });
  }, [week, activeFilters, hoone]);

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
          <div className="flex flex-col items-center justify-center w-full h-[160px]">
          <h1 className="text-heading1-bold text-center mb-12">ÕPETAJATE KONSULTATSIOONID</h1>
            <div className="text-center">Laadin andmeid...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="tunniplaan-bg-one flex flex-col w-full items-center justify-start min-h-screen bg-vocogray">
      <img src={vocoMuster} alt="voco muster" className='absolute top-0 left-0 w-full h-1/3 md:hidden'/>
      <div className='flex flex-col items-center justify-center w-full h-full z-10 p-4'>
        <div className='flex flex-col items-center justify-center w-full h-[160px]'>
        <h1 className="text-heading1-bold text-center mb-12">ÕPETAJATE KONSULTATSIOONID</h1>
        </div>
        
        <div className='flex flex-col items-center justify-center w-full md:w-5/6 h-full'>
          {/* Filtrid */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 mb-8">
            <div className='w-full md:w-auto'>
              <select 
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="border border-black bg-white text-black p-3 rounded w-full appearance-none"
              >
                <option value="">Kõik õpetajad</option>
                {teachers.map((teacher) => (
                  <option key={teacher} value={teacher}>{teacher}</option>
                ))}
              </select>
            </div>

            <div className='w-full md:w-auto mt-4 md:mt-0'>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-black bg-white text-black p-3 rounded w-full appearance-none"
              >
                <option value="">Kõik kuupäevad</option>
                {getDateRanges().map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className='w-full md:w-auto mt-4 md:mt-0'>
              <select 
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border border-black bg-white text-black p-3 rounded w-full appearance-none"
              >
                <option value="">Kõik ajad</option>
                {getAvailableTimes().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className='w-full md:w-auto mt-4 md:mt-0'>
              <button 
                onClick={handleSearch}
                className="bg-black text-white p-3 rounded w-full transition duration-300 "
              >
                Otsi
              </button>
            </div>
          </div>

          {/* Aktiivsed filtrid */}
          {(activeFilters.teacher || activeFilters.date || activeFilters.time) && (
            <div className="mb-4 text-center w-full">
              <p className="text-gray-600 flex flex-wrap justify-center items-center gap-2">
                Aktiivsed filtrid: 
                {activeFilters.teacher && <span className="bg-gray-200 px-2 py-1 rounded ">Õpetaja: {activeFilters.teacher}</span>}
                {activeFilters.date && <span className="bg-gray-200 px-2 py-1 rounded">Kuupäev: {activeFilters.date}</span>}
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
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200 flex items-center inline-flex"
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
            <div className="text-center text-gray-600 my-4 w-full">
              Valitud filtritega konsultatsioone ei leitud.
            </div>
          )}

          {/* Table Component */}
          <div className='flex flex-col items-center justify-center w-full h-full'>
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
    </div>
  )
};
