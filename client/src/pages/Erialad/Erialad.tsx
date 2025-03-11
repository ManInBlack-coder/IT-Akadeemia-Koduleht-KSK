import './Erialad.css'
import axios from "axios"
import { getApiUrl } from "../../utils/functions"
import { useState, useEffect } from "react"
import erialad3 from '../../assets/erialad/example3.png'

interface StudyProgram {
  oppekava_nimetus: string;
  oppe_baastase?: string;
  oppevorm_sonadega: string;
  oppekava_id: string;
  saavutatav_tase: string;
}

interface ErialadGroup {
  erialad: {
    [key: string]: StudyProgram;
  };
}

interface AdmissionData {
  [key: string]: ErialadGroup;
}

const Erialad = () => {
  const [erialad, setErialad] = useState<AdmissionData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // Filter states
  const [educationRequirement, setEducationRequirement] = useState<string>("")
  const [achievableLevel, setAchievableLevel] = useState<string>("")
  const [studyForm, setStudyForm] = useState<string>("")
  
  // Unique filter options
  const [uniqueEducationRequirements, setUniqueEducationRequirements] = useState<string[]>([])
  const [uniqueAchievableLevels, setUniqueAchievableLevels] = useState<string[]>([])
  const [uniqueStudyForms, setUniqueStudyForms] = useState<string[]>([])
  
  // Filtered data
  const [filteredData, setFilteredData] = useState<AdmissionData>()

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${getApiUrl()}/veebilehe_andmed/vastuvott`)
    .then(response => {
      setErialad(response.data)
      setFilteredData(response.data)
      extractUniqueFilterOptions(response.data)
      setIsLoading(false)
    })
  }, [])
  
  // Extract unique filter options from data
  const extractUniqueFilterOptions = (data: AdmissionData) => {
    const educationReqs = new Set<string>()
    const achievableLevels = new Set<string>()
    const studyForms = new Set<string>()
    
    Object.values(data).forEach(group => {
      Object.values(group.erialad).forEach(program => {
        if (program.oppe_baastase) {
          educationReqs.add(program.oppe_baastase)
        }
        if (program.saavutatav_tase) {
          achievableLevels.add(program.saavutatav_tase)
        }
        if (program.oppevorm_sonadega) {
          studyForms.add(program.oppevorm_sonadega)
        }
      })
    })
    
    setUniqueEducationRequirements(Array.from(educationReqs))
    setUniqueAchievableLevels(Array.from(achievableLevels))
    setUniqueStudyForms(Array.from(studyForms))
  }
  
  // Apply filters
  const applyFilters = () => {
    if (!erialad) return
    
    const filtered: AdmissionData = {}
    
    Object.entries(erialad).forEach(([key, group]) => {
      const filteredErialad: {[key: string]: StudyProgram} = {}
      
      Object.entries(group.erialad).forEach(([programKey, program]) => {
        const matchesEducation = !educationRequirement || 
          (program.oppe_baastase === educationRequirement || 
           (!program.oppe_baastase && educationRequirement === "Puudub"))
        
        const matchesLevel = !achievableLevel || 
          program.saavutatav_tase === achievableLevel
        
        const matchesForm = !studyForm || 
          program.oppevorm_sonadega === studyForm
        
        if (matchesEducation && matchesLevel && matchesForm) {
          filteredErialad[programKey] = program
        }
      })
      
      if (Object.keys(filteredErialad).length > 0) {
        filtered[key] = {
          ...group,
          erialad: filteredErialad
        }
      }
    })
    
    setFilteredData(filtered)
  }
  
  // Reset filters
  const resetFilters = () => {
    setEducationRequirement("")
    setAchievableLevel("")
    setStudyForm("")
    setFilteredData(erialad)
  }

  return (
    <div className='flex w-full flex-col min-h-screen justify-start items-center'>
      <div className={`erialad-bg flex w-full justify-center min-h-80 px-4`}>
        <div className="z-1 flex text-white font-semibold justify-end items-center flex-col text-center gap-4 md:gap-12 pb-16">
          <h1 className="text-heading3-bold md:text-heading1-bold text-2xl text-black md:text-[40px]">ÕPI, MIS SIND HUVITAB</h1>
          <p className='text-base-medium text-black'>Lorem ipsum dolor sit amet consectetur. Morbi lectus cursus morbi massa felis nunc. Integer eu dolor sapien sapien. </p>
        </div>
      </div>
      
      {/* Filter section */}
      <div className="w-full mt-8 px-4 space-y-[24px]">
        {/* Filter dropdowns */}
        <div className="flex flex-col gap-y-[12px]">
          {/* Education requirement filter */}
          <div className="relative border-2 border-black">
            <select 
              className="flex w-full p-4 appearance-none bg-white text-black text-large-bold text-center focus:outline-none"
              value={educationRequirement}
              onChange={(e) => setEducationRequirement(e.target.value)}
            >
              <option value="">Haridusnõudeta</option>
              <option value="Puudub">Puudub</option>
              {uniqueEducationRequirements.map(req => (
                <option key={req} value={req}>{req}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Achievable level filter */}
          <div className="relative border-2 border-black">
            <select 
              className="flex w-full p-4 appearance-none bg-white text-black text-large-bold text-center focus:outline-none"
              value={achievableLevel}
              onChange={(e) => setAchievableLevel(e.target.value)}
            >
              <option value="">Saavutatav tase</option>
              {uniqueAchievableLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Study form filter */}
          <div className="relative border-2 border-black">
            <select 
              className="flex w-full p-4 appearance-none bg-white text-black text-large-bold text-center focus:outline-none"
              value={studyForm}
              onChange={(e) => setStudyForm(e.target.value)}
            >
              <option value="">Õppekorraldus</option>
              {uniqueStudyForms.map(form => (
                <option className='' key={form} value={form}>{form}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Search button */}
        <div className="flex justify-center">
          <button 
            onClick={applyFilters}
            className="bg-black text-white py-4 px-8 font-medium text-center w-full"
          >
            Otsi Eriala
          </button>
        </div>
      </div>

      {/* Results section */}
      <div className="w-full max-w-4xl mx-auto mt-8 px-4 pb-[148px]">
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredData && Object.keys(filteredData).length > 0 ? (
          Object.entries(filteredData).map(([key, value]) => (
            <div key={key} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(value.erialad).map(([studyProgramKey, studyProgramValue]) => (
                  <div key={studyProgramKey} className="bg-vocogray overflow-hidden shadow-sm">
                    <div className="w-full h-64 overflow-hidden">
                      <img 
                        src={erialad3} 
                        alt={studyProgramValue.oppekava_nimetus} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-heading5-bold mb-3 text-center">{studyProgramValue.oppekava_nimetus}</h3>
                      <p className="text-base-medium mb-4">
                        Lorem ipsum dolor sit amet consectetur. Morbi lectus cursus morbi massa felis nunc. Integer eu dolor sapien sapien. Faucibus vel
                      </p>
                      <div className="space-y-2 mb-5">
                        <p className="text-small-regular">
                          <span className="text-small-bold">Haridusnõue:</span> {studyProgramValue.oppe_baastase || "Puudub"}
                        </p>
                        <p className="text-small-regular">
                          <span className="text-small-bold">Õppekorraldus:</span> {studyProgramValue.oppevorm_sonadega}
                        </p>
                        <p className="text-small-regular">
                          <span className="text-small-bold">Saavutatav tase:</span> {studyProgramValue.saavutatav_tase}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-large-medium">Ei leitud ühtegi eriala valitud filtritega.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 text-itkool underline"
            >
              Lähtesta filtrid
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Erialad
