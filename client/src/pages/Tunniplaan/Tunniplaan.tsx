import { useState, useEffect } from 'react'
import vocoMuster from '../../assets/tunniplaan/VOCO muster.svg'
import { Table } from '../../components/Table'
import axios from 'axios'
import { getApiUrl } from '../../utils/functions'
import sampleGroupTimetable from './sampleGroupTimetable.json'
import sampleRoomTimetable from './sampleRoomTimetable.json'

const Tunniplaan = () => {
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
  const formattedDate = firstDayOfWeek.toISOString().split('T')[0];
  const [week, setWeek] = useState<string>(formattedDate)
  const [currentRoom, setCurrentRoom] = useState<string>("")
  const [currentGroup, setCurrentGroup] = useState<string>("")

  const [timetableTitle, setTimetableTitle] = useState<string>("")

  const [rooms, setRooms] = useState<string[]>([
    "A401",
    "A402",
    "A403",
    "A404",
    "A405",
    "A406",
    "A407",
  ])

  const [groups, setGroups] = useState<Grupp[] | undefined>()

  const [timetableData, setTimetableData] = useState<ScheduleType | undefined>()

  useEffect(() => {
    axios.get(`${getApiUrl()}/veebilehe_andmed/oppegrupid?seisuga=not_ended`)
    .then(response => {
      const data = response.data as { grupid: Grupp[] }
      setGroups(data.grupid)
    })
  }, [])

  useEffect(() => {
    console.log(week)
    if(currentGroup) {
      setCurrentRoom("")
      setTimetableTitle(`Tunniplaan ${groups?.find((group) => group.id === Number(currentGroup))?.tahis}`)
      axios.get(`${getApiUrl()}/veebilehe_andmed/tunniplaan?nadal=${week}&grupp=${currentGroup}`)
      .then(response => {
        const data = response.data as ScheduleType
        if(!data || !data.tunnid || Object.keys(data.tunnid).length === 0) {
          setTimetableData(sampleGroupTimetable as ScheduleType)
        } else {
          setTimetableData(data)
        }
      })
      .catch(error => {
        console.error("Error fetching timetable data:", error);
        setTimetableData(sampleGroupTimetable as ScheduleType)
      })
    }
  }, [currentGroup, week])

  useEffect(() => {
    if(currentRoom) {
      setCurrentGroup("")
      setTimetableTitle(`Tunniplaan ${currentRoom}`)
      axios.get(`${getApiUrl()}/veebilehe_andmed/tunniplaan?nadal=${new Date().toISOString()}&ruum=${currentRoom}`)
      .then(response => {
        const data = response.data as ScheduleType
        if(!data || !data.tunnid || Object.keys(data.tunnid).length === 0) {
          setTimetableData(sampleRoomTimetable as ScheduleType)
        } else {
          setTimetableData(data)
        }
      })
    }
  }, [currentRoom])

  return (
    <div className="tunniplaan-bg-one flex flex-col w-full items-center justify-start min-h-screen bg-vocogray">
      <img src={vocoMuster} alt="voco muster" className='absolute top-0 right-0 w-2/3 h-full'/>
      <div className='flex flex-col items-center justify-center w-full h-full z-10'>
        <div className='flex flex-col items-center justify-center w-3/4 md:w-full h-[240px] md:h-[160px]'>
          <h1 className='text-heading1-bold text-black text-center'>Õppegruppide tunniplaanid ja õpperuumide plaanid</h1>
        </div>
        {/* Tunniplaanid */}
        <div className='flex flex-col items-center justify-center w-5/6 h-full my-4'>
          {/* Tunniplaani filterid */}
          <div className='flex flex-row items-center justify-start w-full h-full gap-4'>
            <div className='flex flex-col items-start justify-center h-full min-w-[200px]'>
              <label className="text-small-medium text-black">Vali tunniplaan</label>
              {groups && (
                <select className='text-base-regular text-black bg-white p-4 border border-black outline-none w-full mt-2' onChange={(e) => setCurrentGroup(e.target.value)}>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id} className='text-base-regular text-black bg-white border border-black'>{group.tahis}</option>
                  ))}
                </select>
              )}
            </div>
            <div className='flex flex-col items-start  justify-center h-full min-w-[200px]'>
              <label className="text-small-medium text-black">Vali ruum</label>
              <select className='text-base-light text-black bg-white p-4 border border-black outline-none w-full mt-2' onChange={(e) => {setCurrentRoom(e.target.value)}}>
                {rooms.map((room) => (
                  <option key={room} className='text-base-light text-black bg-white p-4 border border-black'>{room}</option>
                ))}
              </select>
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
