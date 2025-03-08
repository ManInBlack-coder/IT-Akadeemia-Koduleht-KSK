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

const convertToScheduleType = (konsultatsioonid: KonsultatsioonidData, currentWeek: string): ScheduleType => {
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

  // Loome aja ja tunni ID vastavuse
  const timeToId: { [key: string]: string } = {
    "8:30": "1",
    "10:15": "2",
    "12:15": "3",
    "14:00": "4",
    "15:45": "5",
    "17:30": "6",
    "19:15": "7",
    "21:00": "8",
    "22:45": "9"
  };

  // Genereerime nädala kuupäevad
  const weekDays: string[] = [];
  const monday = new Date(currentWeek);
  
  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);
    weekDays.push(currentDate.toISOString().split('T')[0]);
  }

  // Initsialiseerime iga päeva tühja massiiviga
  weekDays.forEach(day => {
    schedule.tunnid[day] = [];
  });

  // Loome dünaamilise päevade kaardi
  const dayMap: { [key: string]: string } = {
    'E': weekDays[0],
    'T': weekDays[1],
    'K': weekDays[2],
    'N': weekDays[3],
    'R': weekDays[4]
  };

  // Lisame konsultatsioonid vastavatele päevadele
  konsultatsioonid.konsultatsioonid.forEach(k => {
    k.paev.split(', ').forEach(day => {
      const date = dayMap[day];
      if (date) {
        const [startTime] = k.aeg.split('-');
        const tundId = timeToId[startTime] || "1"; // Kui ei leia vastet, kasutame esimest tundi

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

  // Sorteerime konsultatsioonid aja järgi
  Object.keys(schedule.tunnid).forEach(date => {
    schedule.tunnid[date].sort((a, b) => {
      return a.algus.localeCompare(b.algus);
    });
  });

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
  const [filteredData, setFilteredData] = useState<ScheduleType | undefined>()

  const hooneOptions = [
    { value: "KPL", label: "Kopli" },
    { value: "POL", label: "Põhja" },
    { value: "STR", label: "Sõpruse" },
    { value: "STR2", label: "Sõpruse 2" },
    { value: "ALL", label: "Kõik" }
  ]

  const timeOptions = [
    "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
  ]

  useEffect(() => {
    setIsLoading(true);
    // Kasutame ainult sampleConsultations andmeid
    setTimetableData(convertToScheduleType(sampleConsultations, week));
    setTeachers([...new Set(sampleConsultations.konsultatsioonid.map((k: KonsultatsioonType) => k.opetaja))].sort());
    setIsLoading(false);
  }, [week]);

  useEffect(() => {
    if (timetableData) {
      // Kui filtrid on tühjad, näita kõiki konsultatsioone
      if (!selectedTeacher && !selectedDate && !selectedTime) {
        setFilteredData(timetableData);
      } else {
        // Muidu käivita otsing
        handleSearch();
      }
    }
  }, [timetableData, selectedTeacher, selectedDate, selectedTime]);

  const handleSearch = () => {
    if (!timetableData) return;

    // Kui ükski filter pole valitud, näita kõiki konsultatsioone
    if (!selectedTeacher && !selectedDate && !selectedTime) {
      setFilteredData(timetableData);
      return;
    }

    let filtered = { ...timetableData };
    filtered.tunnid = { ...timetableData.tunnid };

    // Filtreeri iga päeva konsultatsioonid
    Object.keys(filtered.tunnid).forEach(date => {
      filtered.tunnid[date] = timetableData.tunnid[date].filter(item => {
        let matchesTeacher = true;
        let matchesTime = true;
        let matchesDate = true;

        // Õpetaja filter
        if (selectedTeacher) {
          matchesTeacher = item.opetaja.toLowerCase().includes(selectedTeacher.toLowerCase());
        }

        // Kellaaja filter
        if (selectedTime) {
          matchesTime = item.algus === selectedTime;
        }

        // Kuupäeva filter
        if (selectedDate) {
          const [startStr, endStr] = selectedDate.split('-');
          const start = new Date(startStr.split('.').reverse().join('-'));
          const end = new Date(endStr.split('.').reverse().join('-'));
          const current = new Date(date);
          matchesDate = current >= start && current <= end;
        }

        return matchesTeacher && matchesTime && matchesDate;
      });
    });

    setFilteredData(filtered);
  };

  // Genereeri kuupäevavahemikud järgmise 4 nädala jaoks
  const getDateRanges = () => {
    const ranges = [];
    const startDate = new Date();
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + (i * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const formattedStart = weekStart.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const formattedEnd = weekEnd.toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      ranges.push(`${formattedStart}-${formattedEnd}`);
    }
    return ranges;
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
              {timeOptions.map((time) => (
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

          {/* Teade, kui tulemusi pole */}
          {filteredData && Object.values(filteredData.tunnid).every(arr => arr.length === 0) && (
            <div className="text-center text-gray-600 my-4">
              Valitud filtritega konsultatsioone ei leitud.
            </div>
          )}

          {/* Table Component */}
          {filteredData && (
            <Table 
              type="consultations"
              data={[filteredData]}
              title="Konsultatsioonid"
              week={week}
              setWeek={setWeek}
            />
          )}
        </div>
      </div>
    </div>
  )
}
