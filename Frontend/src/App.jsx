import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import OruzjaPregled from './pages/oruzja/OruzjaPregled'
import OruzjaDodaj from './pages/oruzja/OruzjaDodaj'
import OruzjaPromjena from './pages/oruzja/OruzjaPromjena'


function App() {

  
  return (
    <>
      <NavBarEdunova />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.ORUZJE_PREGLED} element={<OruzjaPregled />} />
        <Route path={RoutesNames.ORUZJE_NOVI} element={<OruzjaDodaj />} />
        <Route path={RoutesNames.ORUZJE_PROMJENA} element={<OruzjaPromjena />} />
      </Routes>
    </>
  )
}

export default App
