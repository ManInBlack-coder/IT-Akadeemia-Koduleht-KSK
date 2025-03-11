import './Avaleht.css'
import { Link } from 'react-router-dom'
import technologist from '../../assets/avaleht/technologist.png'
import example2 from '../../assets/avaleht/example2.png'
import { Button } from '../../components/Button'

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
    },
    {
      title: "IT Karjääripäev",
      location: "Peahoone",
      date: "12.12.2024",
      time: "10.00 – 16.00",
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
              <Button buttonText="Leia Eriala" color="blue"/>
            </Link>
          </div>
      </div>
      <div className='bg-itkool flex w-full justify-center min-h-80 px-4'>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex-col text-center gap-8 md:gap-12 py-8 w-full max-w-5xl">
          <div className='relative w-full'>
            <h1 className="text-heading3-bold md:text-heading1-bold text-2xl md:text-[40px] text-center">
              Miks valida IT <br className='block md:hidden'/>Akadeemia?
            </h1>
            <img 
              className='w-8 h-8 absolute left-[calc(50%+5rem)] bottom-1 lg:left-[calc(50%+14rem)] lg:bottom-1.5'
              src={technologist} 
              alt="technologist" 
            />
          </div>
          <h2 className="text-large-medium lg:text-heading5-bold text-center ">Pakume <span className="text-large-bold lg:text-heading5-bold">mitmekesiseid</span><br className='block lg:hidden'/> õppimisvõimalusi ja <span className="text-large-bold lg:text-heading5-bold">tihedat koostööd</span><br className='block lg:hidden'/> <span className="text-large-bold lg:text-heading5-bold">ettevõtetega</span>, et aidata sul saavutada<br className='block lg:hidden'/> oma eesmärgid.</h2>
        </div>
      </div>
      <div className='flex flex-col lg:w-full items-center gap-y-[24px] lg:gap-y-[48px]'>
        {/* First */}
        <div className='bg-vocogray flex w-5/6 lg:w-4/6 flex-col lg:flex-row min-h-80 lg:min-h-[500px] mt-[46px]'>
          <div className='flex flex-col gap-y-[37px] items-center lg:items-start lg:justify-center lg:w-1/2 lg:pl-16 lg:py-8'>
            <div className='lg:hidden flex w-full min-h-80 example'></div>
            <div className='flex text-heading6-bold lg:text-heading3-bold text-center lg:text-left w-5/6 lg:w-full'>Võimalusterohke õppimine IT ja ärivaldkonnas</div>
            <div className='flex justify-center lg:justify-start mt-[24px] mb-[24px] lg:mt-8 lg:mb-0'>
              <Link to="/erialad">
                <Button buttonText="Leia Eriala" color="black"/>
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex lg:w-1/2 lg:min-h-full'>
            <div className='w-full h-full bg-cover bg-center example'></div>
          </div>
        </div>
        {/* Second */}
        <div className='bg-vocogray flex w-5/6 lg:w-4/6 flex-col lg:flex-row min-h-80 lg:min-h-[500px]'>
          <div className='hidden lg:flex lg:w-1/2 lg:min-h-full order-1 lg:order-none'>
            <div className='w-full h-full bg-cover bg-center example'></div>
          </div>
          <div className='flex flex-col gap-y-[37px] items-center lg:items-start lg:justify-center lg:w-1/2 lg:pl-16 lg:py-8'>
            <div className='lg:hidden flex w-full min-h-80 example'></div>
            <div className='flex text-heading6-bold lg:text-heading3-bold text-center lg:text-left w-5/6 lg:w-full'>Kaasaegsed õpperuumid ja laborid</div>
            <div className='flex justify-center lg:justify-start mt-[24px] mb-[24px] lg:mt-8 lg:mb-0'>
              <Link to="/erialad">
                <Button buttonText="Leia Eriala" color="black"/>
              </Link>
            </div>
          </div>
        </div>
        {/* Third */}
        <div className='bg-vocogray flex w-5/6 lg:w-4/6 flex-col lg:flex-row min-h-80 lg:min-h-[500px]'>
          <div className='flex flex-col gap-y-[37px] items-center lg:items-start lg:justify-center lg:w-1/2 lg:pl-16 lg:py-8'>
            <div className='lg:hidden flex w-full min-h-80 example'></div>
            <div className='flex text-heading6-bold lg:text-heading3-bold text-center lg:text-left w-5/6 lg:w-full'>Tihe koostöö juhtivate ettevõtetega</div>
            <div className='flex justify-center lg:justify-start mt-[24px] mb-[24px] lg:mt-8 lg:mb-0'>
              <Link to="/erialad">
                <Button buttonText="Leia Eriala" color="black"/>
              </Link>
            </div>
          </div>
          <div className='hidden lg:flex lg:w-1/2 lg:min-h-full'>
            <div className='w-full h-full bg-cover bg-center example'></div>
          </div>
        </div>
      </div>
      <div className='bg-vocogray flex flex-col w-full min-h-screen px-4 mt-[79px] pb-[98px]'>
        <div className='flex flex-col text-center gap-y-[28px] mt-[68px]'>
          <div className='text-heading3-bold'>SÜNDMUSED VOCO-s</div>
          <div className='text-large-medium'>Hoia end kursis VOCO-s toimuvate põnevate üritustega!</div>
        </div>
        
        {/* Events sections - Mobile view is stacked, Desktop view is 3 columns */}
        <div className='flex flex-col lg:flex-row lg:justify-between lg:gap-x-8 max-w-7xl mx-auto w-full mt-[46px] lg:mt-[94px]'>
          {/* Täna */}
          <div className='mb-[60px] lg:mb-0 lg:w-1/3'>
            <div className='lg:flex lg:w-full lg:justify-center'>
              <p className='text-heading6-bold text-itkool'>Täna</p>
            </div>
            {eventsData.tana.map((event, index) => (
              <div key={`tana-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} className="w-24 h-24 object-cover" />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular'>
                    {event.location}<br/>{event.date}<br/>kl {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Peagi tulekul */}
          <div className='mb-[60px] lg:mb-0 lg:w-1/3'>
            <div className='lg:flex lg:w-full lg:justify-center'>
              <p className='text-heading6-bold text-itkool'>Peagi tulekul</p>
            </div>
            {eventsData.peagiTulekul.map((event, index) => (
              <div key={`peagi-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} className="w-24 h-24 object-cover" />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular'>
                    {event.location}<br/>{event.date}<br/>kl {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pikkaajalised */}
          <div className='lg:w-1/3'>
            <div className='lg:flex lg:w-full lg:justify-center'>
              <p className='text-heading6-bold text-itkool'>Pikkaajalised</p>
            </div>
            {eventsData.pikkaajalised.map((event, index) => (
              <div key={`pikk-${index}`} className='flex flex-row mt-[28px]'>
                <img src={event.image} alt={event.title} className="w-24 h-24 object-cover" />
                <div className='flex flex-col ml-[17px] gap-y-[12px]'>
                  <div className='text-large-bold'>{event.title}</div>
                  <div className='text-small-regular'>
                    {event.location}<br/>{event.date}<br/>kl {event.time}
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
