import { Button, Container, Table } from "react-bootstrap";
import OptikaService from "../../services/OptikaService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function OptikaPregled(){

    const[optike,setOptike] = useState();

    const navigate = useNavigate();





    async function dohvatiOptike() {

        await OptikaService.get()
        .then((odgovor)=>{
            console.log('Vratio se');
            console.log(odgovor);
            setOptike(odgovor);
        })
        .catch((e)=>{console.error(e)});
    }

    useEffect(()=>{
        dohvatiOptike();
    },[]);

    async function obrisiAsync(sifra){
        const odgovor = OptikaService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiOptike();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.OPTIKE_NOVA}>Dodaj novu optiku</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Proizvođać</th>
                        <th>Magnifikacija</th>
                        <th>Težina</th>
                        <th>Cijena</th>
                    </tr>
                </thead>
                <tbody>
                    {optike && optike.map((optika,index)=>(
                        <tr key={index}>
                            <td>{optika.naziv}</td>
                            <td>{optika.proizvodac}</td>
                            <td>{optika.magnifikacija+'x'}</td>
                            <td>{optika.tezina+'g'}</td>
                            <td>

                                {optika.cijena==null
                                ? 'Nije definirano'
                                :
                                <NumericFormat 
                                value={optika.cijena}
                                displayType={'text'}
                                thousandseperator='.'
                                decimalseperator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                                />
                           }

                            </td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/optike/${optika.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp; &nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(optika.sifra )}>
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