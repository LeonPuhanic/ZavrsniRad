import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarAplikacija from './components/NavBarAplikacija'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import {Routes,Route} from 'react-router'
import OruzjePregled from './pages/Oruzja/OruzjePregled'

function App() {


  return (
    <>
      <NavBarAplikacija />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.ORUZJE_PREGLED} element={<OruzjePregled />} ></Route>
      </Routes>
    </>
  )
}

export default App
