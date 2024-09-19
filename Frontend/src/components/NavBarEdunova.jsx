import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';


export default function NavBarEdunova(){

    const navigate = useNavigate();

    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Zavrsna APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate(RoutesNames.HOME)}>Početna</Nav.Link>
            <Nav.Link href="https://lekileon-001-site1.ctempurl.com/swagger/index.html" target='_blank'>Swagger</Nav.Link>
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>navigate(RoutesNames.ORUZJE_PREGLED)}>Oruzja</NavDropdown.Item>
              <NavDropdown.Divider />
              <Navbar className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="https://github.com/LeonPuhanic">
            <img
              alt=""
              src="/public/25231.ico"
              width="15"
              height="15"
              className="d-inline-block align-mid"
            />{' '}
            Github
          </Navbar.Brand>
        </Container>
      </Navbar>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}