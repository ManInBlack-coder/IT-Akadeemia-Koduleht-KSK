import { useState, useEffect } from 'react'
import vocoMuster from '../../assets/tunniplaan/VOCO muster.svg'
import { Table } from '../../components/Table'
import axios from 'axios'
import { getApiUrl } from '../../utils/functions'
import rooms from './ruumid.json'

const Tunniplaan = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const formattedDate = firstDayOfWeek.toISOString().split('T')[0];
  const [week, setWeek] = useState<string>(formattedDate)
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [currentGroup, setCurrentGroup] = useState<string | null>(null)

  const [timetableTitle, setTimetableTitle] = useState<string>("")

  const [groups, setGroups] = useState<Grupp[] | undefined>()

  const [timetableData, setTimetableData] = useState<ScheduleType | undefined>()

  useEffect(() => {
    console.log(rooms)
    axios.get(`${getApiUrl()}/veebilehe_andmed/oppegrupid?seisuga=not_ended`)
    .then(response => {
      const data = response.data as { grupid: Grupp[] }
      setGroups([{id: 0, tahis: "Vali õppegrupp", oppekava: "", kursus: 0}, ...data.grupid])
    })
  }, [])

  useEffect(() => {
    if(currentGroup) {
      setCurrentRoom("")
      setTimetableTitle(`Tunniplaan ${groups?.find((group) => group.id === Number(currentGroup))?.tahis}`)
      axios.get(`${getApiUrl()}/veebilehe_andmed/tunniplaan?nadal=${week}&grupp=${currentGroup}`)
      .then(response => {
        const data = response.data as ScheduleType
        setTimetableData(data)
      })
      .catch(error => {
        console.error("Error fetching timetable data:", error);
      })
    }
  }, [currentGroup, week])

  useEffect(() => {
    if(currentRoom) {
      setCurrentGroup("")
      setTimetableTitle(`Tunniplaan ${rooms[currentRoom as keyof typeof rooms]}`)
      axios.get(`${getApiUrl()}/veebilehe_andmed/tunniplaan?nadal=${week}&ruum=${currentRoom}`)
      .then(response => {
        const data = response.data as ScheduleType
        setTimetableData(data)
      })
    }
  }, [currentRoom])

  return (
    <div className="tunniplaan-bg-one flex flex-col w-full items-center justify-start min-h-screen bg-vocogray">
      <img src={vocoMuster} alt="voco muster" className='absolute top-0 right-0 w-full h-1/3 md:w-2/3 md:h-full'/>
      <div className='flex flex-col items-center justify-center w-full h-full z-10 p-4'>
        <div className='flex flex-col items-center justify-center w-full h-[160px]'>
          <h1 className='text-heading1-bold text-black text-center'>Õppegruppide tunniplaanid ja õpperuumide plaanid</h1>
        </div>
        {/* Tunniplaanid */}
        <div className='flex flex-col items-center justify-center w-full md:w-5/6 h-full my-4'>
          {/* Tunniplaani filterid */}
          <div className='flex flex-row items-center justify-start w-full h-full gap-4'>
            <div className='flex flex-col items-start justify-center h-full w-full md:w-[200px]'>
              <label className="text-small-medium text-black">Vali tunniplaan</label>
              {groups && (
                <select data-testid='grupp' className='text-base-regular text-black bg-white p-4 border border-black outline-none w-full mt-2 appearance-none' onChange={(e) => setCurrentGroup(e.target.value)}>
                  {groups.map((group) => (
                    <option data-testid={`group-${group.id}`} key={group.id} value={group.id} className='text-base-regular text-black bg-white border border-black'>{group.tahis}</option>
                  ))}
                </select>
              )}
            </div>
            <div className='flex flex-col items-start justify-center h-full w-full md:w-[200px]'>
              <label className="text-small-medium text-black">Vali ruum</label>
              {rooms && (
                <select data-testid='ruum'className='text-base-light text-black bg-white p-4 border border-black outline-none w-full mt-2 appearance-none' onChange={(e) => {setCurrentRoom(e.target.value)}}>
                  {Object.entries(rooms).map(([roomKey, roomValue]) => (
                    <option key={roomKey} value={roomKey} className='text-base-light text-black bg-white p-4 border border-black'>{roomValue}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            {timetableData && <Table setWeek={setWeek} week={week} title={timetableTitle} type="timetable" data={[timetableData]}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tunniplaan
