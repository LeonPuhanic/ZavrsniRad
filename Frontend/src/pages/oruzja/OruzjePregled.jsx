import { Button, Container, Table } from "react-bootstrap";
import OruzjeService from "../../services/OruzjeService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function OruzjePregled(){

    const[oruzja,setOruzja] = useState();

    const navigate = useNavigate();





    async function dohvatiOruzja() {

        await OruzjeService.get()
        .then((odgovor)=>{
            console.log('Vratio se');
            console.log(odgovor);
            setOruzja(odgovor);
        })
        .catch((e)=>{console.error(e)});
    }

    useEffect(()=>{
        dohvatiOruzja();
    },[]);

    async function obrisiAsync(sifra){
        const odgovor = OruzjeService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiOruzja();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.ORUZJE_NOVO}>Dodaj novo oružje</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Proizvođać</th>
                        <th>Kalibar</th>
                        <th>Težina</th>
                        <th>Kapacitet Spremnika</th>
                        <th>Godina Proizvodnje</th>
                        <th>Cijena</th>
                    </tr>
                </thead>
                <tbody>
                    {oruzja && oruzja.map((oruzje,index)=>(
                        <tr key={index}>
                            <td>{oruzje.naziv}</td>
                            <td>{oruzje.proizvodac}</td>
                            <td>{oruzje.kalibar}</td>
                            <td>{oruzje.tezina}</td>
                            <td>{oruzje.kapacitetspremnika}</td>
                            <td>{oruzje.godinaproizvodnje}</td>
                            <td>

                                {oruzje.cijena==null
                                ? 'Nije definirano'
                                :
                                <NumericFormat 
                                value={oruzje.cijena}
                                displayType={'text'}
                                thousandseperator='.'
                                decimalseperator=','
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale
                                />
                           }

                            </td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/oruzja/${oruzje.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp; &nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(oruzje.sifra )}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}