import logo from '../assets/logo.svg'
export const Footer = () => {
  return (
    <div className='w-full bg-black p-8 flex flex-row justify-center items-center'>
      <div className="flex flex-row justify-start items-start md:items-center gap-8 md:gap-32 w-full md:w-3/4">
        <div className='flex flex-col items-start justify-start'>
          <img src={logo} alt="logo"/>
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <p className="text-small-bold md:text-large-bold text-white">Kontakt</p>
          <p className='text-small-regular md:text-large-regular text-white'>info@voco.ee</p>
          <p className='text-small-regular md:text-large-regular text-white'>+372 361 810</p>
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
          <p className="text-small-bold md:text-large-bold text-white">VOCO</p>
          <p className='text-small-regular md:text-large-regular text-white'>Kopli 1</p>
          <p className='text-small-regular md:text-large-regular text-white'>Tartu 50115, Estonia</p>
        </div>
      </div>
    </div>
  )
}
