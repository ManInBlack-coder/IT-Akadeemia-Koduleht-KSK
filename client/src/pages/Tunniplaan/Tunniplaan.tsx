import { useState } from 'react'
import vocoMuster from '../../assets/tunniplaan/VOCO muster.svg'
import { Table } from '../../components/Table'

const Tunniplaan = () => {

  const [currentRoom, setCurrentRoom] = useState<string>("")
  const [currentGroup, setCurrentGroup] = useState<string>("")

  const [rooms, setRooms] = useState<string[]>([
    "A101",
    "A102",
    "A103",
    "A104",
    "A105",
    "A106",
    "A107",
    "A108",
    "A109",
    "A110",
    "A111",
  ])

  const [groups, setGroups] = useState<string[]>([
    "ITA24",
    "ITA23",
    "ITA22",
    "UX24",
    "UX23",
    "VS24"
  ])

  return (
    <div className="tunniplaan-bg-one flex flex-col w-full items-center justify-start min-h-screen bg-vocogray">
      <img src={vocoMuster} alt="voco muster" className='absolute top-0 right-0 w-full h-full object-cover'/>
      <div className='flex flex-col items-center justify-center w-full h-full z-10'>
        <div className='flex flex-col items-center justify-center w-full h-full h-[500px]'>
          <h1 className='text-heading1-bold text-black text-center'>Õppegruppide tunniplaanid ja õpperuumide plaanid</h1>
        </div>
        {/* Tunniplaanid */}
        <div className='flex flex-col items-center justify-center w-2/3 h-full'>
          {/* Tunniplaani filterid */}
          <div className='flex flex-row items-center justify-start w-full h-full gap-4'>
            <div className='flex flex-col items-start justify-center h-full min-w-[200px]'>
              <label className="text-base-regular text-black">Vali tunniplaan</label>
              <select className='text-base-light text-black bg-white p-4 border border-black outline-none w-full' onChange={(e) => setCurrentGroup(e.target.value)}>
                {groups.map((group) => (
                  <option key={group} className='text-base-light text-black bg-white p-4 border border-black'>{group}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col items-start  justify-center h-full min-w-[200px]'>
              <label className="text-base-regular text-black">Vali ruum</label>
              <select className='text-base-light text-black bg-white p-4 border border-black outline-none w-full' onChange={(e) => setCurrentRoom(e.target.value)}>
                {rooms.map((room) => (
                  <option key={room} className='text-base-light text-black bg-white p-4 border border-black'>{room}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <Table />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tunniplaan
