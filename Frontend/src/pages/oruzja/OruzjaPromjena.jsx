import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import OruzjeService from "../../services/OruzjeService";
import { useEffect, useState } from "react";



export default function OruzjaPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [oruzje,setOruzje] = useState({});

    async function dohvatiOruzje(){
        const odgovor = await OruzjeService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        odgovor.poruka.izvodiSeOd = moment.utc(odgovor.poruka.izvodiSeOd).format('yyyy-MM-DD');
        setOruzje(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiOruzje();
    },[]);

    async function promjena(oruzje){
        //console.log(oruzje);
        //console.log(JSON.stringify(oruzje));
        const odgovor = await OruzjeService.promjena(routeParams.sifra,oruzje);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.ORUZJE_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'), // 'naziv' je došao iz atributa name od Form.Control
            kalibar: parseString(podaci.get('kalibar')),
            cijena: parseFloat(podaci.get('cijena')),
            tezina: moment.Int(podaci.get('tezina')),
            kapacitetspremnika: moment.Int(podaci.get('kapacitetspremnika')),
        });

    }

    return(
        <Container>
            Promjena oruzja
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="kalibar">
                    <Form.Label>Trajanje</Form.Label>
                    <Form.Control type="text" name="kalibar" min={0} max={50} />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01}/>
                </Form.Group>

                <Form.Group controlId="tezina">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="number" name="tezina" min={1} max={500000} />
                </Form.Group>

                <Form.Group controlId="kapacitetspremnika">
                    <Form.Check label="number" name="kapacitetspremnika" />
                </Form.Group>


                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.ORUZJE_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni oruzje
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}