import React from 'react'
import headerLogo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="w-full bg-black p-4 flex flex-col md:flex-row justify-center items-center gap-12">
        <Link to="/">
            <img src={headerLogo}/>
        </Link>
        <div className="text-white flex gap-12 h-full items-center">
            <Link to="/erialad">
                <p>Erialad</p>
            </Link>
            <Link to="/praktika">
                <p>Praktika</p>
            </Link>
            <Link to="/tunniplaan">
                Tunniplaan
            </Link>
            <Link to="/konsultatsioonid">
                Konsultatsioonid
            </Link>
            <Link to="/voistlused">
                Võistlused
            </Link>
        </div>
    </div>
  )
}
