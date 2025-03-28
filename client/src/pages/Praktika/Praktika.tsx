import './Praktika.css'
import { Button } from '../../components/Button'
import vocoLogo from '../../assets/logos/voco muster RGB-03 2.svg'
import calendarIcon from '../../assets/icons/calendar.svg'
import arrowRight from '../../assets/icons/arrow_right.svg'
import documentIcon from '../../assets/icons/document_icon.svg'
import { PraktikaJourneryComponent } from './PraktikaJourneryComponent'


import astroBalticsLogo from '../../assets/logos/astro baltics logo 1.png';
import bitwebLogo from '../../assets/logos/Bitweb logo 1.png';
import diaraInfraLogo from '../../assets/logos/Diara Infra logo 1.png';
import g4sLogo from '../../assets/logos/G4S_Eesti_logo 1.png';
import kliinikumLogo from '../../assets/logos/Tartu ülikooli kliinikumi logo 1.png';

import erasmusLogo from '../../assets/praktika/ErasmusLogo.png'
import praktikaDocumentsImage from '../../assets/praktika/praktikaMaterjalidImage.png'

type PraktikaJourneyComponentData = {
  title: string;
  body: any;
  bgColor: string;
}

type PraktikaPartner = {
  name: string;
  desc: string;
  logo: string;
}

type PraktikaLink = {
  text: string;
  link: string;
}

const Praktika = () => {

  const praktikaPartners: PraktikaPartner[] = [
    {
      name: "Tartu Ülikooli Kliinikum",
      desc: "Kliinikum on Eesti üks suurimaid tervishoiu- ja teiste valdkondade praktikabaase, kus töötab ligikaudu 4800 töötajat ja osutatakse tervishoiuteenust enam kui 19 erialakliinikus.\nKoos meie inimestega saame Sulle pakkuda suurepärast õpikeskkonda ja -võimalusi ning professionaalset juhendamist.",
      logo: kliinikumLogo 
    },
    {
      name: "Diara Arendus",
      desc: "Diara Infra pakub mitmekülgseid IT-teenuseid ja professionaalset hooldust. Ettevõte loob kaasaegseid ja funktsionaalseid kodulehti ning veebirakendusi.",
      logo: diaraInfraLogo
    },
    {
      name: "G4S",
      desc: "G4Sile kuulub Eesti Turvaettevõtete Liidu andmetel 30% Eesti turvaturust, 39% Eesti valveteenuste turust ja 60% Eesti tehnilise valve turust. Oma hea maine klientide hulgas on G4S pälvinud eelkõige tänu teenuste ja teeninduse kvaliteedile.",
      logo: g4sLogo
    },
    {
      name: "Astro Baltics",
      desc: "Astro Baltics on kõrge IT kompetentsiga ja 26-aastase kogemustepagasiga eestimaine ettevõte, kelle eesmärgiks on turul pakkuda keskmisest keerukamaid ja nutikamaid IT lahendusi. Oleme juhtivaid tanklalahenduste arendajaid Eestis, tehes lahendusi maksete, juhtseadmete ja riistvara jaoks.",
      logo: astroBalticsLogo
    },
    {
      name: "Bitweb",
      desc: "Bitwebi missioon on olla inimlik IT-süsteemide arenduspartner, kes kogemuse ja kuulamisoskuse abil suudab pakkuda klientidele seda, mida nad vajavad, mitte ilmtingimata seda, mida esialgu küsitakse.",
      logo: bitwebLogo
    }
  ]

  const praktikaJourney: PraktikaJourneyComponentData[] = [
    { 
      title: "TUTVUSTUS",
      body: 
      <>
        <p className="text-large-medium">Praktikaprotsessi tutvustus</p>
        <ul className='list-disc space-y-2 px-4'>
          <li>kandideerimisdokumentide tutvustus</li>
        </ul>
      </>,
      bgColor: 'bg-itkool'
    },
    {
      title: "DOKUMENDID",
      body:
      <>
        <p className="text-large-medium">Kandideerimisdokumentide ettevalmistus:</p>
        <ul className='list-disc space-y-2 px-4'>
          <li>CV</li>
          <li>motivatsioonikiri</li>
          <li>e-kiri</li>
          <li>e-portfoolio</li>
        </ul>
      </>,
      bgColor: 'bg-toidukool'
    },
    {
      title: "KANDIDEERIMINE",
      body:
      <>
        <ul className='list-disc space-y-2 px-4'>
          <li>kandideerimisdokumentide tutvustus</li>
          <li>alusta kandideerimist hiljemalt kuu enne praktikaperioodi</li>
        </ul>
      </>,
      bgColor: 'bg-ilukool'
    },
    {
      title: "ETTEVÕTTE TEGEVUSED",
      body:
      <>
        <p className="text-large-medium">Sind võivad ees oodata:</p>
        <ul className='list-disc space-y-2 px-4'>
          <li>proovitöö</li>
          <li>test</li>
          <li>vestlus</li>
        </ul>
      </>,
      bgColor: 'bg-ehituskool'
    },
    {
      title: "TAOTLUSLEHT JA PRAKTIKALEPING",
      body: 
      <>
        <ul className='list-disc px-4'>
          <li>õpilane täidab praktikakoha taotluslehe ja esitab ettevõttesse</li>
          <li>täidetud taotluslehe esitamine praktikakoordinaatorile</li>
          <li>praktikaleping tuleb meilile hiljemalt praktika 1. päeval</li>
        </ul>
      </>,
      bgColor: 'bg-koolitused'
    }
  ]

  const praktikaLinks: PraktikaLink[] = [
    {
      text: "CV näidis",
      link: "/"
    },
    {
      text: "Motivatsioonikirja juhend",
      link: "/"
    },
    {
      text: "Praktikakohad",
      link: "https://docs.google.com/spreadsheets/d/1izdG_kONMn4sTa9Ho0AWfeCzFh1jgwoKYPeZZYypxHo/edit?gid=0#gid=0"
    },
    {
      text: "Praktikaprotsess",
      link: "https://moodle.voco.ee/pluginfile.php/25634/mod_resource/content/1/Praktikaprotsessi%20joonis.png"
    },
    {
      text: "Praktika tingimused",
      link: "https://moodle.voco.ee/pluginfile.php/25685/mod_folder/content/0/Praktilise%20t%C3%B6%C3%B6%20ning%20praktika%20l%C3%A4biviimise%20tingimused%20ja%20kord.pdf?forcedownload=1"
    }
  ]

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center md:gap-4">
      <div className={`praktika-bg-one flex w-full justify-center min-h-96 px-4`}>
        <div className="z-1 flex text-white font-semibold justify-center items-center flex-col text-center gap-8 md:gap-12 py-8">
          <h1 className="text-heading3-bold md:text-heading1-bold text-2xl md:text-[40px]">PRAKTIKAVÕIMALUSED IT AKADEEMIAS</h1>
          <h2 className="text-base-medium md:text-heading3-medium text-lg md:text-xl">Kujunda oma tulevik praktiliste kogemustega Eestis ja välismaal</h2>
        </div>
      </div>
      <div className="w-full min-h-64 flex flex-col justify-center items-center gap-8 md:gap-12 py-12 md:py-24 px-4">
        <div className="flex flex-col justify-center items-center w-full md:w-2/3 text-center">
          <p className="text-base-bold md:text-[20px]">Oleme rahvusvahelisusele avatud haridusasutus ja aktiivne partner koostööprojektides.</p>
          <br/>
          <p className="text-base-medium md:text-[20px]">
            Alates 2016. aastast liitusime õpirände hartaga ning 2021. aastal omistati Tartu Rakenduslikule Kolledžile Erasmus+ õpirände akrediteering, mis tähendab, et perioodil 2021 – 2027 saab kool lihtsustatud korras toetust uute õpirännete rahastamiseks.
          </p>
        </div>
        <Button buttonText='Uuri lisaks' color='blue' onClick={() => window.scrollTo({ top: document.getElementById('praktika')?.offsetTop, behavior: 'smooth' })}/>
      </div>
      <div className="flex w-full justify-center items-center min-h-96 bg-vocogray py-8 md:py-12 px-4">
        <div className="flex flex-col md:flex-row w-full md:w-5/6 justify-between items-center gap-8">
          <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start gap-8">
            <div className="w-full md:w-2/3 flex flex-col justify-start items-center md:items-start gap-4">
              <h2 className="text-heading5-bold md:text-heading2-bold">Praktikaperioodid</h2>
              <p className="text-base-medium md:text-large-medium text-center md:text-left">Vähemalt kaks nädalat enne praktika algust valmistab kolledžipoolne praktikajuhendaja ette praktika dokumendid (praktikalepingu ja lisad) ja selgitab nende täitmist.</p>
            </div>
            <div className="flex gap-2 items-center justify-center hover:cursor-pointer">
              <img src={calendarIcon} alt="calendar" className="hidden md:block"/>
              <p className="text-base-bold text-itkool hover:underline">Praktika kuupäevad ja kestus</p>
              <img src={arrowRight} alt="arrow"/>
            </div>
            <Button buttonText="Vaata juhendeid" color='black' onClick={() => window.scrollTo({ top: document.getElementById('documents')?.offsetTop, behavior: 'smooth' })}/>
          </div>
          <div className="w-full md:w-1/2 hidden md:flex justify-center md:justify-end items-center">
            <img src={vocoLogo} alt="voco logo" className="w-3/4 md:w-auto"/>
          </div>
        </div>
      </div>
      <div className="w-full min-h-96 flex justify-center items-center py-8 md:py-12 px-4">
        <div className="w-full xl:w-5/6 flex flex-col justify-center items-start gap-8">
          <h2 className='text-heading2-bold'>Praktikale kandideerimise protsess</h2>
          <div className="flex flex-col w-full justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col lg:flex-row w-full justify-between gap-8 sm:gap-12 lg:gap-8 xl:gap-16">
              {praktikaJourney.slice(0, 3).map((component, index) => (
                <PraktikaJourneryComponent 
                  key={index}
                  number={`${index + 1}.`} 
                  title={component.title} 
                  body={component.body} 
                  bgColor={component.bgColor}
                />
              ))}
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-between gap-8 sm:gap-12 lg:gap-8 xl:gap-16">
              {praktikaJourney.slice(3, 5).map((component, index) => (
                <PraktikaJourneryComponent
                  key={index + 3}
                  number={`${index + 4}.`}
                  title={component.title}
                  body={component.body}
                  bgColor={component.bgColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center min-h-96 py-12 px-4">
        <div className="flex flex-col w-5/6 justify-center items-center md:items-start gap-8">
          <h2 className="text-heading2-bold">Meie praktikapartnerid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-24 md:gap-8">
            {praktikaPartners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center md:items-start justify-start gap-4">
                <h3 className="text-heading5-bold text-itkool">{partner.name}</h3>
                <p className="text-large-medium">{partner.desc}</p>
                <img src={partner.logo} height={40}/>
              </div>
            ))}
          </div>
        </div>  
      </div>
      <div id="praktika" className="praktika-bg-two flex w-full justify-center items-center min-h-96 py-12 md:py-16 px-4">
        <div className="flex relative w-5/6 flex-col justify-center items-center md:items-start gap-8">
          <h2 className="text-heading2-bold text-center md:text-left">Võimalused välispraktikaks</h2>
          <div>
            <h3 className="text-heading5-bold text-center md:text-left">Mida teha, et välismaale praktikale või õppima minna?</h3>
            <br/>            
            <p className="text-base-medium text-center md:text-left">
              Kõigepealt palume Sul oma huvist märku anda, et teaksime õpirändeid kavandada. Selleks mõtle läbi miks, kuna ja millises riigis sooviksid oma praktikat teha.  Tartu Rakenduslikul Kolledžil on koostööpartnerid peaaegu kõigis Euroopa riikides. Vaata kaarti <a href="https://partnerid.voco.ee" target="_blank" rel="noopener noreferrer" className="underline">SIIT</a>.
              <br/>
              Soovitame juba ette välispraktika planeerida oma praktikaperioodiga samale ajale. Ja loomulikult kõige tähtsam – mõtle, mis on Su praktika eesmärk ja mida soovid välispraktika raames teha!
              <br/>
              <br/>
              Seejärel võtab meie rahvusvaheliste suhete koordinaator Sinuga ühendust, et täpsustada välispraktika tingimusi.  Ta  otsib vastuvõtvad partnerid õpirännete korraldamiseks ja kui koos vastuvõtjaga on leitud sobiv praktikakoht ja aeg, siis tuleb täita ametlik välispraktika avaldus ning muud dokumendid. Enamasti korraldatakse ka enne praktikale minekut online kohtumine ja mõistagi on soovitav leida aega, et vastuvõtva riigi kultuuri ja keelega tutvuda.
              <br/>
              <br/>
              <br/>
              Loe õpilaste ja õpetajate õpirände blogisid:
            </p>
          </div>
          <Button buttonText='VOCOMOBILTY' color='blue' onClick={() => window.open("https://en.voco.ee/category/mobility/", "_blank")}/>
          <img className='-z-10 absolute bottom-0 right-10 hidden md:block' src={erasmusLogo}/>
        </div>
      </div>
      <div id="documents"className="flex w-full justify-center items-center min-h-96 py-8 md:py-12 px-4">
        <div className="flex flex-col md:flex-row w-5/6 justify-center items-center gap-8">
          <div className="hidden md:flex w-1/2 justify-center items-center">
            <img src={praktikaDocumentsImage} className="w-full max-w-md"/>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-8">
            <h3 className="text-heading3-bold text-center md:text-left w-full">Praktikaga seotud juhendid ja materjalid</h3>
            <p className="text-large-medium text-center md:text-left">IT-akadeemia praktikatega seotud juhendid ja materjalid leiad siit.</p>
            <div className="grid grid-cols-2 w-full gap-4">
              {praktikaLinks.map((link) => (
                <a key={link.text} href={link.link} target="_blank" rel="noopener noreferrer" className='flex justify-start gap-2 items-center'>
                  <img src={documentIcon} className="w-5"/>
                  <p className="text-itkool text-base-bold hover:underline">{link.text}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Praktika
