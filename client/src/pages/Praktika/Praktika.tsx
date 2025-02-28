import praktikaBackground1 from '../../assets/praktika/praktikaBackground1.png'
import './Praktika.css'
import { Button } from '../../components/Button'

const Praktika = () => {
  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center">
      <div className={`praktika-bg-one flex w-full justify-center min-h-96`}>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex flex-col justify-center items-center gap-12">
          <h1 className="text-5xl">PRAKTIKAVÕIMALUSED IT AKADEEMIAS</h1>
          <p className="text-2xl font-semibold">Kujunda oma tulevik praktiliste kogemustega Eestis ja välismaal</p>
        </div>
      </div>
      <div className="w-full min-h-64 flex flex-col justify-center items-center gap-12 py-12">
        <div className="flex flex-col justify-center items-center w-2/3 text-center">
          <b>Oleme rahvusvahelisusele avatud haridusasutus ja aktiivne partner koostööprojektides.</b>
          <br/>
          <p>
            Alates 2016. aastast liitusime õpirände hartaga ning 2021. aastal omistati Tartu Rakenduslikule Kolledžile Erasmus+ õpirände akrediteering, mis tähendab, et perioodil 2021 – 2027 saab kool lihtsustatud korras toetust uute õpirännete rahastamiseks.
          </p>
        </div>
        <Button buttonText='Uuri lisaks'/>
      </div>
    </div>
  )
}

export default Praktika
