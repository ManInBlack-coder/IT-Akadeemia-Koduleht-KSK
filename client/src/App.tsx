import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Avaleht from './pages/Avaleht/Avaleht';
import Erialad from './pages/Erialad/Erialad';
import Praktika from './pages/Praktika/Praktika';
import Tunniplaan from './pages/Tunniplaan/Tunniplaan';
import Voistlused from './pages/Voistlused/Voistlused';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-screen items-center">
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
