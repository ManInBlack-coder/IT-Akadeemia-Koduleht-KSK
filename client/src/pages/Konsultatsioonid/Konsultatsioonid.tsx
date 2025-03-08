import { useEffect, useState } from "react"
import { Table } from "../../components/Table"
import axios from "axios"

export const Konsultatsioonid = () => {
  const [konsultatsioonid, setKonsultatsioonid] = useState<KonsultatsioonType[]>([])
  
  useEffect(() => {
    axios.get('https://test.voco.ee/veebilehe_andmed/konsultatsioonid?hoone=KPL')
    .then(response => {
      const data = response.data as KonsultatsioonidData
      setKonsultatsioonid(data.konsultatsioonid)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
  }, [])

  return (
    <div>
      <div>
        {/* Header */}
        <div className="">
          <h1 className="margin top 10px"> ÕPETAJATE KONSULTATSIOONID</h1>
        </div>

</div>
    </div>
  )
}
