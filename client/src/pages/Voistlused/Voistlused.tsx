import { useState, useEffect } from 'react';

const Voistlused = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentNoorMeisterIndex, setCurrentNoorMeisterIndex] = useState(0);
  
  const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  
  const slides = [
    {
      id: 1,
      image: '/src/assets/images/aasta1.png',
      alt: 'Võistlus pilt 1'
    },
    {
      id: 2,
      image: '/src/assets/images/aasta2.png',
      alt: 'Võistlus pilt 2'
    },
    {
      id: 3,
      image: '/src/assets/images/aasta3.png',
      alt: 'Võistlus pilt 3'
    },
    {
      id: 4,
      image: '/src/assets/images/aasta1.png',
      alt: 'Võistlus pilt 4'
    },
    {
      id: 5,
      image: '/src/assets/images/aasta2.png',
      alt: 'Võistlus pilt 5'
    },
    {
      id: 6,
      image: '/src/assets/images/aasta3.png',
      alt: 'Võistlus pilt 6'
    },
    {
      id: 7,
      image: '/src/assets/images/aasta1.png',
      alt: 'Võistlus pilt 7'
    },
  ];

  const noorMeisterSlides = [
    {
      id: 1,
      image: '/src/assets/images/noor1.png',
      alt: 'Noor meister pilt 1'
    },
    {
      id: 2,
      image: '/src/assets/images/noor2.png',
      alt: 'Noor meister pilt 2'
    },
    {
      id: 3,
      image: '/src/assets/images/noor3.png',
      alt: 'Noor meister pilt 3'
    },
    {
      id: 4,
      image: '/src/assets/images/noor1.png',
      alt: 'Noor meister pilt 4'
    },
    {
      id: 5,
      image: '/src/assets/images/noor2.png',
      alt: 'Noor meister pilt 5'
    },
    {
      id: 6,
      image: '/src/assets/images/noor3.png',
      alt: 'Noor meister pilt 6'
    },
    {
      id: 7,
      image: '/src/assets/images/noor1.png',
      alt: 'Noor meister pilt 7'
    },
  
  ];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev >= slides.length - 3 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === 0 ? slides.length - 3 : prev - 1
    );
  };

  const nextNoorMeisterSlide = () => {
    setCurrentNoorMeisterIndex((prev) => 
      prev >= noorMeisterSlides.length - 3 ? 0 : prev + 1
    );
  };

  const prevNoorMeisterSlide = () => {
    setCurrentNoorMeisterIndex((prev) => 
      prev === 0 ? noorMeisterSlides.length - 3 : prev - 1
    );
  };

  // Funktsioon, mis tagastab hetkel näidatavad 3 pilti
  const getVisibleSlides = (allSlides: any[], currentIndex: number) => {
    return allSlides.slice(currentIndex, currentIndex + 3);
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-start items-center md:gap-4" >
      <div 
        className="w-full min-h-96 flex items-center justify-center bg-black"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(/src/assets/images/voistlusedtaust.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: 0,
          padding: 0
        }}
      >
        <h1 className="text-4xl font-bold text-white uppercase">
          Kutsemeistrivõistlused
        </h1>
      </div>

      <div className="w-full">
        <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
          <h1 className="text-3xl font-bold mb-4">Kutsevõistlus "Aasta Tegija"</h1>
          
          <p className="text-gray-800 mb-8">
            On aeg anda stardipuuk kutsevõistlustele "Aasta Tegija 2025"! Ehkki esimesed võistlused alustavad juba jaanuaris jääb
            suurem osa võistlustest siiski märtsikuusse. Kutsemeistrivõistlustel toimuvad 37. võistlusalal. Selguvad parimad noored
            meistrid, kellest mitmed lähevad kooli esindama üleriigilistele rahvusvahelistele võistlustele. Iga ala parim pärjatakse 7.
            märtsil toimuval lõpugalal tiitliga "Aasta Tegija 2025". IT Akadeemias on võimalik võistelda järgmistel võistlustel:
          </p>

          <div className="flex items-center gap-1 mb-6">
            <span className="text-sm text-gray-600">Arhiiv</span>
            {years.map((year) => (
              <button
                key={year}
                className={`px-2 py-1 text-sm ${
                  selectedYear === year 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="w-full">
            <div className="grid grid-cols-[1fr_2fr_1fr]">
              <div className="bg-black text-white p-4 text-large-bold flex justify-center">AEG JA KOHT</div>
              <div className="bg-black text-white p-4 text-large-bold flex justify-center ">VÕISTLUS JA ÜLESANNE</div>
              <div className="bg-black text-white p-4 text-large-bold flex justify-center">VÕITJAD</div>
            </div>

            <div className="divide-y-4 divide-white">
              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#F4F6F9' }}>
                <div className="p-4">
                  <div className="font-bold text-base-bold">Kopli 1 A-411</div>
                  <div className=" text-base-regular ">Kopli 1 A-418</div>
                  <div className="text-base-regular">Kopli 1 A-406</div>
                  <div className="text-base-regular">Kopli 1 A-310</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 text-heading5-bold">Noorematarkvaraarendaja</h3>
                  <p className="mb-2 text-base-regular">Luua rakendus, mis aitab vähendada toidujäätmeid ja keskkonnajäätuseid, edendades kogukonnasisest koostööd, säästlikku tarbimist ning tõstes teadlikkust kesklikkuse eluviisist.</p>
                  <p className="mb-2 text-base-regular">Valmistatud rakendus peab aitama täita mitmeid kesklikkuse eesmärke:</p>
                  <ul className="list-none pl-4 space-y-1">
                    <li className="text-base-regular">• Toidujäätmete vähendamine: Rakendus võimaldab jagada soomeüliõpiliku toitu, mis muidu läheks raisku</li>
                    <li className="text-base-regular">• Kogukonna koostöö: Rakendus edendab inimeste vahelist koostööd, kus kogukonnaliikmed saavad üleliigset süüa, jagades üle jäävat toitu</li>
                    <li className="text-base-regular">• Keskkonnateadlik eluviis: Rakendus võimaldab kasutajatel jälgida oma todu tootmiseks ja selle hävitamiseks kuluvat süsinikujalajälge</li>
                    <li className="text-base-regular">• Säästlik tarbimine: Inimesi julgustatakse kasutama juba olemasolevat toitu ja ressursse, enne kui nad ostavad midagi uut</li>
                    <li className="text-base-regular">• Teadlikkuse tõstmine: Rakenduse kaudu jagatakse infot toidujäätmete ja raiskmise vähendamise olulisuse ning asjaliku arutelu kaalulikuse kohta</li>
                  </ul>
                </div>
                <div className="p-4"></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#E9ECF3' }}>
                <div className="p-4">
                  <div className="font-bold text-base-bold">25.-27.02 Kopli 1 A-407</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-heading5-bold">UX/UI disaineri kutsevõistlus</h3>
                </div>
                <div className="p-4"></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#F4F6F9' }}>
                <div className="p-4">
                  <div className="font-bold text-base-bold">05.03 Kopli 1 A-303</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-heading5-bold">Tarkvaraarendaja (ITA24)</h3>
                </div>
                <div className="p-4"></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#E9ECF3' }}>
                <div className="p-4">
                  <div className="font-bold text-base-bold">05.03 Kopli 1 A-418</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-heading5-bold">IT-süsteemide spetsialist</h3>
                </div>
                <div className="p-4"></div>
              </div>
            </div>
          </div>

          {/* Noor meister sektsioon */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4 text-heading2-bold">Noor meister</h2>
            <p className="text-gray-800 mb-8 text-base-regular">
              Noore Meistri nime all on toimuvad kutsemeistrivõistlused alates 2009. aastast. Formaate on mitmeid ja kutsevõistlused
              toimuvad aastaringselt üle Eesti.
            </p>

            <div className="w-full">
              <div className="grid grid-cols-[1fr_2fr_1fr]">
                <div className="bg-black text-white p-4 text-large-bold flex justify-center">AEG JA KOHT</div>
                <div className="bg-black text-white p-4 text-large-bold flex justify-center">VÕISTLUS JA SIHTRÜHM</div>
                <div className="bg-black text-white p-4 text-large-bold flex justify-center">JUHENDID</div>
              </div>

              <div className="divide-y-4 divide-white">
                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#F4F6F9' }}>
                  <div className="p-4">
                    <div className="font-bold text-base-bold">14. - 16. mai 2025</div>
                    <div className="text-base-regular">Kuressaare</div>
                    <div className="text-base-regular">Spordikeskus</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 text-heading5-bold">Tarkvaraarendaja</h3>
                    <p className="text-base-regular">
                      Tarkvaraarendaja eriala kutsemeistrivõistlus on mõeldud kuni 26-aastastele (k.a.) noortele
                      (sünniaasta 1999 või hilisem), kes õpivad kutseõppeasutustes tarkvaraarendaja erialal.
                    </p>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <a href="#" className="bg-[#4BB6E8] hover:bg-blue-500 text-white py-2 px-4 rounded text-base-bold">
                      Vaata juhendeid
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#E9ECF3' }}>
                  <div className="p-4">
                  </div>
                  <div className="p-4">
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <a href="#" className="bg-[#4BB6E8] hover:bg-blue-500 text-white py-2 px-4 rounded text-base-bold">
                      Vaata juhendeid
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x-4 divide-white" style={{ backgroundColor: '#F4F6F9' }}>
                  <div className="p-4">
                  </div>
                  <div className="p-4">
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <a href="#" className="bg-[#4BB6E8] hover:bg-blue-500 text-white py-2 px-4 rounded text-base-bold">
                      Vaata juhendeid
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Piltide karussell - Aasta Tegija */}
        <div className="w-full bg-gray-200 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Kutsevõistlus "Aasta Tegija"</h2>
            
            <div className="relative px-10">
              <div className="flex justify-between items-center">
                <button 
                  onClick={prevSlide} 
                  className="absolute left-0 z-10 text-4xl font-bold text-black hover:text-gray-700"
                  aria-label="Eelmine pilt"
                >
                  &#10094;
                </button>
                
                <div className="flex justify-center gap-4 w-full">
                  {getVisibleSlides(slides, currentSlideIndex).map((slide: any) => (
                    <div 
                      key={slide.id} 
                      className="flex justify-center items-center w-1/3"
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="h-60 object-cover rounded shadow-md" 
                      />
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide} 
                  className="absolute right-0 z-10 text-4xl font-bold text-black hover:text-gray-700"
                  aria-label="Järgmine pilt"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Piltide karussell - Noor Meister */}
        <div className="w-full bg-gray-100 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Noor meister</h2>
            
            <div className="relative px-10">
              <div className="flex  justify-between items-center">
                <button 
                  onClick={prevNoorMeisterSlide} 
                  className=" absolute left-0 z-10 text-4xl font-bold text-black hover:text-gray-700"
                  aria-label="Eelmine pilt"
                >
                  &#10094;
                </button>
                
                <div className="flex justify-center gap-4 w-full"> 
                  {getVisibleSlides(noorMeisterSlides, currentNoorMeisterIndex).map((slide: any) => (
                    <div 
                      key={slide.id} 
                      className=" flex justify-center  items-center w-1/3"
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="h-60 object-cover rounded shadow-md" 
                      />
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={nextNoorMeisterSlide} 
                  className="absolute right-0 z-10 text-4xl font-bold text-black hover:text-gray-700"
                  aria-label="Järgmine pilt"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voistlused;
