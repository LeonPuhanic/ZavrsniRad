import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { RoutesNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import OruzjeService from "../../services/OruzjeService";
import { useEffect, useState } from "react";



export default function OruzjePromjena(){

    const trenutna = new Date().getFullYear();

    const navigate = useNavigate();
    const routeParams = useParams();
    const [oruzje,setOruzja] = useState({});

    async function dohvatiOruzje(){
        const odgovor = await OruzjeService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setOruzja(odgovor.poruka);

    }

    useEffect(()=>{
        dohvatiOruzje();
    },[]);


    async function promjena(oruzje){
        const odgovor = await OruzjeService.promjena(routeParams.sifra, oruzje);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.ORUZJE_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'),
            kalibar: podaci.get('kalibar'),
            cijena: parseFloat(podaci.get('cijena')),
            tezina: parseInt(podaci.get('tezina')),
            proizvodac: parseInt(podaci.get('proizvodac')),
            kapacitetspremnika: parseInt(podaci.get('kapacitetspremnika')),
            godinaproizvodnje: parseInt(podaci.get('godinaproizvodnje'))
        });
    }

    return(
        <Container>
            Promjena oružja
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={oruzje.naziv} />
                </Form.Group>

                <Form.Group controlId="kalibar">
                    <Form.Label>Kalibar</Form.Label>
                    <Form.Control type="text" name="kalibar"
                    defaultValue={oruzje.kalibar} />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena (€)</Form.Label>
                    <Form.Control type="number" name="cijena" min={0} max={9999}
                    defaultValue={oruzje.cijena} />
                </Form.Group>

                <Form.Group controlId="tezina">
                    <Form.Label>Težina (g)</Form.Label>
                    <Form.Control type="number" name="tezina" min={0} max={9999}
                    defaultValue={oruzje.tezina} />
                </Form.Group>

                <Form.Group controlId="proizvodac">
                    <Form.Label>Proizvođać</Form.Label>
                    <Form.Control type="number" name="proizvodac" required
                    defaultValue={oruzje.proizvodac} />
                </Form.Group>

                <Form.Group controlId="kapacitetspremnika">
                    <Form.Label>Kapacitet spremnika</Form.Label>
                    <Form.Control type="number" name="kapacitetspremnika" min={0} max={999}
                    defaultValue={oruzje.kapacitetspremnika} />
                </Form.Group>

                <Form.Group controlId="godinaproizvodnje">
                    <Form.Label>Godina proizvodnje</Form.Label>
                    <Form.Control type="number" name="godinaproizvodnje" min={0} max={trenutna}
                    defaultValue={oruzje.godinaproizvodnje} />
                </Form.Group>

           <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RoutesNames.ORUZJE_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Promjeni oružje
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}