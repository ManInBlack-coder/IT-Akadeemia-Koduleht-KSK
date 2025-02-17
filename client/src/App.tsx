import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Avaleht from './components/Avaleht/Avaleht';
import Erialad from './components/Erialad/Erialad';
import Praktika from './components/Praktika/Praktika';
import Tunniplaan from './components/Tunniplaan/Tunniplaan';
import Voistlused from './components/Voistlused/Voistlused';

function App() {

  return (
    <BrowserRouter>
      <div className="flex w-full min-h-screen justify-center">
        <Header/>
        <Routes>
          <Route path="/" element={<Avaleht/>}/>
          <Route path="/erialad" element={<Erialad/>}/>
          <Route path="/praktika" element={<Praktika/>}/>
          <Route path="/tunniplaan" element={<Tunniplaan/>}/>
          <Route path="/voistlused" element={<Voistlused/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
