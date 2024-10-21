import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarAplikacija from './components/NavBarAplikacija'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import {Routes,Route} from 'react-router'
import OruzjePregled from './pages/oruzja/OruzjePregled'
import OruzjeDodaj from './pages/oruzja/OruzjeDodaj'
import OruzjePromjena from './pages/oruzja/OruzjePromjena'
import OptikaPregled from './pages/optike/OptikaPregled'
import OptikaDodaj from './pages/optike/OptikaDodaj'
import OptikaPromjena from './pages/optike/OptikaPromjena'

function App() {

  function godina() {
    const pocetna = 2024;
    const trenutna = new Date().getFullYear();
    if(pocetna===trenutna){
      return trenutna;
    }
    return pocetna + ' - ' + trenutna;
  }

  return (
    <>
      <NavBarAplikacija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.ORUZJE_PREGLED} element={<OruzjePregled />} />

        <Route path={RoutesNames.ORUZJE_NOVO} element={<OruzjeDodaj />} />

        <Route path={RoutesNames.ORUZJE_PROMJENA} element={<OruzjePromjena />} />

        <Route path={RoutesNames.OPTIKE_PREGLED} element={<OptikaPregled />} />

        <Route path={RoutesNames.OPTIKE_NOVA} element={<OptikaDodaj />} />

        <Route path={RoutesNames.OPTIKE_PROMJENA} element= {<OptikaPromjena />} />
      </Routes>
      <hr />
      Leon Puhanic &copy; {godina()}
    </>
  )
}

export default App
