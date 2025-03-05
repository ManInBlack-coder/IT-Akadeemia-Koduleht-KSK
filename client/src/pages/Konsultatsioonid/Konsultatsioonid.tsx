import { useState } from "react"
import Konsul_tabel from "./konsultatsioonide_tabel/konsul_tabel"

export const Konsultatsioonid = () => {
  const [konsultatsioonid, setKonsultatsioonid] = useState<any[]>([])
  
  return (
    <div>


<div>

<div className=""> <h1 className="margin top 10px"> ÕPETAJATE KONSULTATSIOONID</h1></div>


{/*Valiku lahtrid*/}
<div className="">
 
  <div></div>
  <div></div>
  <div></div>
  <div></div>

</div>

{/* Konsultatsioonide tabel*/}
<div className="">
<Konsul_tabel/>
</div>

{ /*Registreeri valitud aeg */
}<div className=""></div>


</div>
    </div>
  )
}
