import axios from "axios"
import { getApiUrl } from "../../utils/functions"
import { useState, useEffect } from "react"

const Erialad = () => {

  const [erialad, setErialad] = useState<AdmissionData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${getApiUrl()}/veebilehe_andmed/vastuvott`)
    .then(response => {
      setErialad(response.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="p-4">

      {isLoading ? <div>Loading...</div> : erialad && Object.entries(erialad).map(([key, value]) => (
        <div key={key} className="mb-4">
          <h2 className="text-lg font-bold">{value.nimetus}</h2>
          <p>Algus: {value.algus}</p>
          <p>Lopp: {value.lopp}</p>
          <p>Eelistusi: {value.eelistusi}</p>
          {Object.entries(value.erialad).map(([studyProgramKey, studyProgramValue]) => (
            <div key={studyProgramKey} className="ml-4">
              <p>Õppekava: {studyProgramValue.oppekava_nimetus}</p>
              <p>Õppekeel: {studyProgramValue.oppekeel.map(language => language.keel).join(', ')}</p>
              <p>Rahastamise allikas: {studyProgramValue.rahastamise_allikas}</p>
              <p>Õppebaastase: {studyProgramValue.oppe_baastase ? studyProgramValue.oppe_baastase : "Puudub"}</p>
              <p>Oppetase: {studyProgramValue.oppetase}</p>
              <p>Õppevorm: {studyProgramValue.oppevorm}</p>
              <p>Õppevorm sonadega: {studyProgramValue.oppevorm_sonadega}</p>
              <p>Õppekava ID: {studyProgramValue.oppekava_id}</p>
              <p>Saavutatav tase: {studyProgramValue.saavutatav_tase}</p>
              {studyProgramValue.uldtingimused && <p>Üldtingimused: {studyProgramValue.uldtingimused.join(', ')}</p>}
              {studyProgramValue.hindamis_kriteeriumid_pdf_link && <p>Hindamise kriteeriumid PDF: <a href={studyProgramValue.hindamis_kriteeriumid_pdf_link} target="_blank" rel="noopener noreferrer">Link</a></p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Erialad
