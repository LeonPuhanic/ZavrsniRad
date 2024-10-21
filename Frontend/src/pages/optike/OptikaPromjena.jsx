import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { RoutesNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import OptikaService from "../../services/OptikaService";
import { useEffect, useState } from "react";



export default function OptikaPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [optika,setOptike] = useState({});

    async function dohvatiOptike(){
        const odgovor = await OptikaService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setOptike(odgovor.poruka);

    }

    useEffect(()=>{
        dohvatiOptike();
    },[]);


    async function promjena(optika){
        const odgovor = await OptikaService.promjena(routeParams.sifra, optika);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.OPTIKE_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'),
            proizvodac: parseInt(podaci.get('proizvodac')),
            magnifikacija: podaci.get('magnifikacija'),
            tezina: parseInt(podaci.get('tezina')),
            cijena: parseFloat(podaci.get('cijena')),
        });
    }

    return(
        <Container>
            Promjena optike
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={optika.naziv}/>
                </Form.Group>

                <Form.Group controlId="proizvodac">
                    <Form.Label>Proizvođać</Form.Label>
                    <Form.Control type="number" name="proizvodac" required 
                    defaultValue={optika.proizvodac}/>
                </Form.Group>


                <Form.Group controlId="tezina">
                    <Form.Label>Težina (g)</Form.Label>
                    <Form.Control type="number" name="tezina" min={0} max={9999} 
                    defaultValue={optika.tezina}/>
                </Form.Group>


                <Form.Group controlId="cijena">
                    <Form.Label>Cijena (€)</Form.Label>
                    <Form.Control type="number" name="cijena" min={0} max={9999} 
                    defaultValue={optika.cijena}/>
                </Form.Group>

                <Form.Group controlId="magnifikacija">
                    <Form.Label>Magnifikacija (x)</Form.Label>
                    <Form.Control type="text" name="magnifikacija"
                    defaultValue={optika.magnifikacija}/>
                </Form.Group>
           <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RoutesNames.OPTIKE_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>
                </Col>
                <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                    Promjeni optiku
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}