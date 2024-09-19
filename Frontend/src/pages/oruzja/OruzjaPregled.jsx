import { Button, Container, Table } from "react-bootstrap";
import OruzjeService from "../../services/OruzjeService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { RoutesNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";



export default function OruzjaPregled(){

    const[oruzja,setOruzja] = useState();

    const navigate = useNavigate();

    async function dohvatiOruzja() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await OruzjeService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setOruzja(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        dohvatiOruzja();
    },[]);

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.');
    }

    function vaucer(v){
        if(v==null) return 'gray';
        if(v) return 'green';
        return 'red'
    }

    async function obrisiAsync(sifra) {
        const odgovor = await OruzjeService.obrisi(sifra);
        //console.log(odgovor);
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
            <Link to={RoutesNames.ORUZJE_NOVI}>Dodaj novi oruzje</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Izvodi se od</th>
                        <th>Vaučer</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {oruzja && oruzja.map((oruzje,index)=>(
                        <tr key={index}>
                            <td>{oruzje.naziv}</td>
                            <td className={oruzje.trajanje==null ? 'sredina' : 'desno'}>
                                {oruzje.trajanje==null ? 'Nije definirano' : oruzje.trajanje}
                                
                                </td>
                            <td className={oruzje.cijena==null ? 'sredina' : 'desno'}>

                                {oruzje.cijena==null
                                ? 'Nije definirano'
                                : 
                                <NumericFormat 
                                value={oruzje.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                                />
                            }

                            </td>
                            <td className={'sredina'}>
                                {formatirajDatum(oruzje.izvodiSeOd)}
                            </td>
                            <td className={'sredina'}>
                                <GrValidate 
                                size={30}
                                color={vaucer(oruzje.vaucer)}
                                />
                            </td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/oruzja/${oruzje.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(oruzje.sifra)}>
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