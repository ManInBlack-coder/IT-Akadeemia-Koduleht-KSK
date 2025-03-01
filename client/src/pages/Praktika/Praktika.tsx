import './Praktika.css'
import { Button } from '../../components/Button'
import vocoLogo from '../../assets/logos/voco muster RGB-03 2.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import arrowRight from '../../assets/icons/arrow_right.svg'

const Praktika = () => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center">
      <div className={`praktika-bg-one flex w-full justify-center min-h-96`}>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex flex-col justify-center items-center gap-12">
          <h1 className="text-heading1-bold" style={{fontSize: '40px'}}>PRAKTIKAVÕIMALUSED IT AKADEEMIAS</h1>
          <h2 className="text-heading3-medium">Kujunda oma tulevik praktiliste kogemustega Eestis ja välismaal</h2>
        </div>
      </div>
      <div className="w-full min-h-64 flex flex-col justify-center items-center gap-12 py-24">
        <div className="flex flex-col justify-center items-center w-2/3 text-center">
          <p className="text-heading5-bold">Oleme rahvusvahelisusele avatud haridusasutus ja aktiivne partner koostööprojektides.</p>
          <br/>
          <p className="text-heading5-medium">
            Alates 2016. aastast liitusime õpirände hartaga ning 2021. aastal omistati Tartu Rakenduslikule Kolledžile Erasmus+ õpirände akrediteering, mis tähendab, et perioodil 2021 – 2027 saab kool lihtsustatud korras toetust uute õpirännete rahastamiseks.
          </p>
        </div>
        <Button buttonText='Uuri lisaks'/>
      </div>
      <div className="flex w-full justify-center items-center min-h-96 bg-vocogray py-12">
        <div className="flex w-5/6 justify-between items-center">
          <div className="w-1/2 flex flex-col justify-start items-start min-h-96 gap-8">
            <div className="w-2/3 flex flex-col justify-start items-start gap-4">
              <h2 className="text-heading2-bold">Praktikaperioodid</h2>
              <p className="text-large-medium">Vähemalt kaks nädalat enne praktika algust valmistab kolledžipoolne praktikajuhendaja ette praktika dokumendid (praktikalepingu ja lisad) ja selgitab nende täitmist.</p>
            </div>
            <div className="flex gap-2 items-center justify-center hover:cursor-pointer">
              <img src={calendarIcon}/>
              <p className="text-base-bold text-itkool hover:underline">Praktika kuupäevad ja kestus</p>
              <img src={arrowRight}/>
            </div>
          </div>
          <div className="w-1/2">
            <img src={vocoLogo}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Praktika
