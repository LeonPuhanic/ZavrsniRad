import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarAplikacija from './components/NavBarAplikacija'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import {Routes,Route} from 'react-router'
import OruzjePregled from './pages/oruzja/OruzjePregled'
import OruzjeDodaj from './pages/oruzja/OruzjeDodaj'
import OruzjePromjena from './pages/oruzja/OruzjePromjena'

function App() {


  return (
    <>
      <NavBarAplikacija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.ORUZJE_PREGLED} element={<OruzjePregled />} />

        <Route path={RoutesNames.ORUZJE_NOVO} element={<OruzjeDodaj />} />

        <Route path={RoutesNames.ORUZJE_PROMJENA} element={<OruzjePromjena />} />
      </Routes>
    </>
  )
}

export default App
