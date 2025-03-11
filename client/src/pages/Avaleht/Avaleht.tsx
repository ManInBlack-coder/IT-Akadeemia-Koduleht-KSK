import './Avaleht.css'
import { Link } from 'react-router-dom'
import technologist from '../../assets/avaleht/technologist.png'
import example2 from '../../assets/avaleht/example2.png'

// Event type definition
interface Event {
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
}

// Event data organized by category
const eventsData: {
  tana: Event[];
  peagiTulekul: Event[];
  pikkaajalised: Event[];
} = {
  tana: [
    {
      title: "Jõululaat",
      location: "Põllu õppehoone",
      date: "12.12.2024",
      time: "12.00 – 18.00",
      image: example2
    },
    {
      title: "IT Karjääripäev",
      location: "Peahoone",
      date: "12.12.2024",
      time: "10.00 – 16.00",
      image: example2
    }
  ],
  peagiTulekul: [
    {
      title: "Jõululaat",
      location: "Põllu õppehoone",
      date: "20.12.2024",
      time: "12.00 – 18.00",
      image: example2
    },
    {
      title: "Programmeerimisvõistlus",
      location: "IT-maja",
      date: "22.12.2024",
      time: "09.00 – 17.00",
      image: example2
    }
  ],
  pikkaajalised: [
    {
      title: "Jõululaat",
      location: "Põllu õppehoone",
      date: "12.12.2024",
      time: "12.00 – 18.00",
      image: example2
    },
    {
      title: "Kursus: Veebiarenduse alused",
      location: "IT-maja",
      date: "15.01.2025 - 15.03.2025",
      time: "18.00 – 20.00",
      image: example2
    }
  ]
};

const Avaleht = () => {
  return (
    <div className='flex w-full flex-col min-h-screen justify-start items-center'>
      <div className={`avaleht-bg flex w-full justify-center min-h-96 px-4`}>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex-col text-center gap-8 md:gap-12 py-8">
            <h1 className="text-heading3-bold md:text-heading1-bold text-2xl md:text-[40px]">IT AKADEEMIA – KUJUNDA OMA TULEVIK!</h1>
            <Link to="/erialad">
              <button className='border border-itkool bg-itkool px-[44px] py-[14px]'>
                <h2 className="text-base-medium">Leia Eriala</h2>
              </button>
            </Link>
          </div>
      </div>
      <div className='bg-itkool flex w-full justify-center min-h-80 px-4'>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex-col text-center gap-8 md:gap-12 py-8 w-full max-w-4xl">
          <div className='relative w-full'>
            <h1 className="text-heading3-bold md:text-heading1-bold text-2xl md:text-[40px] text-center">
              Miks valida IT<br/>Akadeemia?
            </h1>
            <img 
              className='w-8 h-8 absolute' 
              style={{ bottom: '0.25rem', left: 'calc(50% + 5rem)' }} 
              src={technologist} 
              alt="technologist" 
            />
          </div>
          <h2 className="text-large-medium text-center">Pakume <span className="text-large-bold">mitmekesiseid</span><br/> õppimisvõimalusi ja <span className="text-large-bold">tihedat koostööd</span><br/> <span className="text-large-bold">ettevõtetega</span>, et aidata sul saavutada<br/> oma eesmärgid.</h2>
        </div>
      </div>
      <div className='flex flex-col items-center gap-y-[24px]'>
        <div className='bg-vocogray flex w-5/6 flex-col min-h-80 mt-[46px]'>
          <div className='flex flex-col gap-y-[37px] items-center'>
            <div className={`example flex w-full min-h-80`}></div>
            <div className='flex text-heading6-bold text-center w-5/6'>Võimalusterohke õppimine IT ja ärivaldkonnas</div>
          </div>
          <div className='flex justify-center mt-[24px] mb-[24px]'>
            <Link to="/erialad">
              <button className='border bg-black px-[44px] py-[14px]'>
                    <h2 className="text-base-medium text-white">Leia Eriala</h2>
              </button>
            </Link>
          </div>
        </div>
        <div className='bg-vocogray flex w-5/6 flex-col min-h-80'>
          <div className='flex flex-col gap-y-[37px] items-center'>
            <div className={`example flex w-full min-h-80`}></div>
            <div className='flex text-heading6-bold text-center w-5/6'>Võimalusterohke õppimine IT ja ärivaldkonnas</div>
          </div>
          <div className='flex justify-center mt-[24px] mb-[24px]'>
            <Link to="/erialad">
              <button className='border bg-black px-[44px] py-[14px]'>
                    <h2 className="text-base-medium text-white">Leia Eriala</h2>
              </button>
            </Link>
          </div>
        </div>
        <div className='bg-vocogray flex w-5/6 flex-col min-h-80'>
          <div className='flex flex-col gap-y-[37px] items-center'>
            <div className={`example flex w-full min-h-80`}></div>
            <div className='flex text-heading6-bold text-center w-5/6'>Võimalusterohke õppimine IT ja ärivaldkonnas</div>
          </div>
          <div className='flex justify-center mt-[24px] mb-[24px]'>
            <Link to="/erialad">
              <button className='border bg-black px-[44px] py-[14px]'>
                    <h2 className="text-base-medium text-white">Leia Eriala</h2>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-vocogray flex flex-col w-full  min-h-screen px-4 mt-[79px] pb-[98px]'>
        <div className='flex flex-col text-center gap-y-[28px] mt-[68px]'>
          <div className='text-heading3-bold '>SÜNDMUSED VOCO-s</div>
          <div className='text-large-medium'>Hoia end kursis VOCO-s toimuvate põnevate üritustega! </div>
        </div>
        {/* Events sections */}
        <div className='flex flex-col gap-y-[60px]'>
          {/* Täna */}
          <div className='mt-[46px]'>
            <p className='text-heading6-bold text-itkool'>Täna</p>
            {eventsData.tana.map((event, index) => (
              <div key={`tana-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular w-3/4'>
                    {event.location} {event.date}<br/> kl {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Peagi tulekul */}
          <div>
            <p className='text-heading6-bold text-itkool'>Peagi tulekul</p>
            {eventsData.peagiTulekul.map((event, index) => (
              <div key={`peagi-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular w-3/4'>
                    {event.location} {event.date}<br/> kl {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pikkaajalised */}
          <div>
            <p className='text-heading6-bold text-itkool'>Pikkaajalised</p>
            {eventsData.pikkaajalised.map((event, index) => (
              <div key={`pikk-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular w-3/4'>
                    {event.location} {event.date}<br/> kl {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Avaleht
