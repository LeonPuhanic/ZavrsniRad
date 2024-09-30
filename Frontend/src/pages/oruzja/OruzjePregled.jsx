import { Container, Table } from "react-bootstrap";
import OruzjeService from "../../services/OruzjeService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";


export default function OruzjePregled(){

    const[oruzja,setOruzja] = useState();

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


    return(
        <Container>
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
                                <NumbericFormat 
                                value={oruzje.cijena}
                                displayType={'text'}
                                thousandSeperator='.'
                                decimalSeperator=','
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale
                                />
                           }

                            </td>
                            <td>{oruzje.sifra}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}