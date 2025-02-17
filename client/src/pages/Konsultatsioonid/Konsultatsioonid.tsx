import Konsul_tabel from "./konsultatsioonide_tabel/konsul_tabel"

export const Konsultatsioonid = () => {
  return (
    <div>


<div>

<div className=""> <h1> ÕPETAJATE KONSULTATSIOONID</h1></div>


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
