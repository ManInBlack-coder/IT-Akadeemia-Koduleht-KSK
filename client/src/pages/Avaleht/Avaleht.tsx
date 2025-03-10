import './Avaleht.css'
import { Link } from 'react-router-dom'
import technologist from '../../assets/avaleht/technologist.png'

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
    </div>
  )
}

export default Avaleht
