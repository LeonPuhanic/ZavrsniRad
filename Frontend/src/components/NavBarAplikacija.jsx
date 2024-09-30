import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoutesNames } from '/src/constants.js';

export default function NavBarAplikacija() {

    const navigate = useNavigate();

    return(
         <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand onClick={()=>navigate(RoutesNames.HOME)}>Završna APP (U radu)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}>Početna</Nav.Link>
            <Nav.Link href="https://lekileon-001-site1.ctempurl.com/swagger/index.html" target="blank">Swagger</Nav.Link>
            <NavDropdown title="Više" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.ORUZJE_PREGLED)}>Oruzja</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/LeonPuhanic" target="blank">
                Github
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}