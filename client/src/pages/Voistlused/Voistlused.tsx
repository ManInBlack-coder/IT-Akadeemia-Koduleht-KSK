import { useState } from 'react';

const Voistlused = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  
  const slides = [
    {
      id: 1,
      image: '/src/assets/images/voistlus1.jpg',
      alt: 'Võistlus pilt 1'
    },
    {
      id: 2,
      image: '/src/assets/images/voistlus2.jpg',
      alt: 'Võistlus pilt 2'
    },
    {
      id: 3,
      image: '/src/assets/images/voistlus3.jpg',
      alt: 'Võistlus pilt 3'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <div 
        className="w-full h-[300px] flex items-center justify-center bg-black"
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

      <div className="w-full bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
          <h1 className="text-3xl font-bold mb-4">Kutsevõistlus "Aasta Tegija"</h1>
          
          <p className="text-gray-800 mb-8">
           On aeg anda stardipauk kutsevõistlustele „Aasta Tegija 2025“! Ehkki esimesed võistlused alustavad juba jaanuaris jääb suurem osa võistlustest siiski märtsikuusse. Kutsemeistrivõistlused toimuvad 37. võistlusalal. Selguvad parimad noored meistrid, kellest mitmed lähevad kooli esindama üleriigilistele ja rahvusvahelistele võistlustele. Iga ala parim pärjatakse 7. märtsil toimuval lõpugalal tiitliga “Aasta Tegija 2025”. IT Akadeemias on võimalik võistelda järgmistel võistlustel:
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
            <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
              <div className="bg-black text-white p-4">AEG JA KOHT</div>
              <div className="bg-black text-white p-4">VÕISTLUS JA ÜLESANNE</div>
              <div className="bg-black text-white p-4">VÕITJAD</div>
            </div>

            <div className="divide-y divide-white">
              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  <div>Kopli 1 A-411</div>
                  <div>Kopli 1 A-418</div>
                  <div>Kopli 1 A-406</div>
                  <div>Kopli 1 A-310</div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold mb-2">Noorematarkvaraarendaja</h3>
                  <p className="mb-2">Luua rakendus, mis aitab vähendada toidujäätmeid ja keskkonnajäätuseid, edendades kogukonnasisest koostööd, säästlikku tarbimist ning tõstes teadlikkust kesklikkuse eluviisist.</p>
                  <p className="mb-2">Valmistatud rakendus peab aitama täita mitmeid kesklikkuse eesmärke:</p>
                  <ul className="list-disc pl-8 space-y-1">
                    <li>Toidujäätmete vähendamine: Rakendus võimaldab jagada soomeüliõpiliku toitu, mis muidu läheks raisku</li>
                    <li>Kogukonna koostöö: Rakendus edendab inimeste vahelist koostööd, kus kogukonnaliikmed saavad üleliigset süüa, jagades üle jäävat toitu</li>
                    <li>Keskkonnateadlik eluviis: Rakendus võimaldab kasutajatel jälgida oma todu tootmiseks ja selle hävitamiseks kuluvat süsinikujalajälge</li>
                    <li>Säästlik tarbimine: Inimesi julgustatakse kasutama juba olemasolevat toitu ja ressursse, enne kui nad ostavad midagi uut</li>
                    <li>Teadlikkuse tõstmine: Rakenduse kaudu jagatakse infot toidujäätmete ja raiskmise vähendamise olulisuse ning asjaliku arutelu kaalulikuse kohta</li>
                  </ul>
                </div>
                <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  25.-27.02 Kopli 1 A-407
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold">UX/UI disaineri kutsevõistlus</h3>
                </div>
                <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  05.03 Kopli 1 A-303
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Tarkvaraarendaja (ITA24)</h3>
                </div>
                <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}></div>
              </div>

              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  05.03 Kopli 1 A-418
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold">IT-süsteemide spetsialist</h3>
                </div>
                <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}></div>
              </div>
            </div>
          </div>

          {/* Noor meister sektsioon */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4">Noor meister</h2>
            <p className="text-gray-800 mb-8">
              Noore Meistri nime all on toimuvad kutsemeistrivõistlused alates 2009. aastast. Formaate on mitmeid ja kutsevõistlused
              toimuvad aastaringselt üle Eesti.
            </p>

            <div className="w-full">
              <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                <div className="bg-black text-white p-4">AEG JA KOHT</div>
                <div className="bg-black text-white p-4">VÕISTLUS JA SIHTRÜHM</div>
                <div className="bg-black text-white p-4">JUHENDID</div>
              </div>

              <div className="divide-y divide-white">
                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                  <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                    <div className="font-bold">14. - 16. mai 2025</div>
                    <div>Kuressaare</div>
                    <div>Spordikeskus</div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-bold mb-2">Tarkvaraarendaja</h3>
                    <p>
                      Tarkvaraarendaja eriala kutsemeistrivõistlus on mõeldud kuni 26-aastastele (k.a.) noortele
                      (sünniaasta 1999 või hilisem), kes õpivad kutseõppeasutustes tarkvaraarendaja erialal.
                    </p>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}>
                    <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded">
                      Vaata juhendeid
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                  <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  </div>
                  <div className="p-4 bg-white">
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}>
                    <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded">
                      Vaata juhendeid
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr_1fr] divide-x divide-white">
                  <div className="p-4" style={{ backgroundColor: '#F4F6F9' }}>
                  </div>
                  <div className="p-4 bg-white">
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#E9ECF3' }}>
                    <button className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded">
                      Vaata juhendeid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Piltide karussell */}
          <div className="my-12 bg-gray-200 py-12">
            <h2 className="text-3xl font-bold mb-8 px-8">Kutsevõistlus "Aasta Tegija"</h2>
            
            <div className="relative">
              <div className="flex justify-center items-center">
                <button 
                  onClick={prevSlide} 
                  className="absolute left-4 z-10 text-4xl font-bold text-black hover:text-gray-700"
                >
                  &#10094;
                </button>
                
                <div className="flex justify-center gap-4 px-16">
                  {slides.map((slide, index) => (
                    <div 
                      key={slide.id} 
                      className={`${index === currentSlide ? 'block' : 'hidden'} md:block transition-all duration-300`}
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="h-80 object-cover rounded shadow-md" 
                      />
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide} 
                  className="absolute right-4 z-10 text-4xl font-bold text-black hover:text-gray-700"
                >
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voistlused;
