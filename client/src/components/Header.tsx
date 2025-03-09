import headerLogo from '../assets/logo.svg'
import { Link, useLocation } from 'react-router-dom';
import menuIcon from '../assets/icons/menuIcon.svg';
import { useState } from 'react';


export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentPath = useLocation().pathname;

  return (
    <div className="w-full bg-black p-4 flex flex-col justify-start items-center z-20 relative">
        <div className="flex flex-row justify-around md:justify-center md:gap-12 items-center w-full">
            <Link to="/">
                <img src={headerLogo}/>
            </Link>
            <div className="hidden md:flex gap-12 h-full items-center">
                <Link to="/erialad">
                    <p className={`${currentPath === '/erialad' ? 'text-gray-300' : 'text-white'} hover:underline`}>Erialad</p>
                </Link>
                <Link to="/praktika">
                    <p className={`${currentPath === '/praktika' ? 'text-gray-300' : 'text-white'} hover:underline`}>Praktika</p>
                </Link>
                <Link to="/tunniplaan">
                    <p className={`${currentPath === '/tunniplaan' ? 'text-gray-300' : 'text-white'} hover:underline`}>Tunniplaan</p>
                </Link>
                <Link to="/konsultatsioonid">
                    <p className={`${currentPath === '/konsultatsioonid' ? 'text-gray-300' : 'text-white'} hover:underline`}>Konsultatsioonid</p>
                </Link>
                <Link to="/voistlused">
                    <p className={`${currentPath === '/voistlused' ? 'text-gray-300' : 'text-white'} hover:underline`}>Võistlused</p>
                </Link>
            </div>
            <div className="flex md:hidden text-white gap-4 h-full items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none">
                    <img src={menuIcon} alt="menu" className="w-6 h-6" />
                </button>
            </div>
        </div>
        {/* Menu list */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full bg-black z-10`}>
            <div className="flex flex-col items-center justify-center h-full text-white">
                <Link to="/erialad" onClick={() => setIsMenuOpen(false)} className="p-4">
                    <p>Erialad</p>
                </Link>
                <Link to="/praktika" onClick={() => setIsMenuOpen(false)} className="p-4">
                    <p>Praktika</p>
                </Link>
                <Link to="/tunniplaan" onClick={() => setIsMenuOpen(false)} className="p-4">
                    <p>Tunniplaan</p>
                </Link>
                <Link to="/konsultatsioonid" onClick={() => setIsMenuOpen(false)} className="p-4">
                    <p>Konsultatsioonid</p>
                </Link>
                <Link to="/voistlused" onClick={() => setIsMenuOpen(false)} className="p-4">
                    <p>Võistlused</p>
                </Link>
            </div>
        </div>
    </div>
  )
}
