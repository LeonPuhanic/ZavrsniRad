import { HttpService } from "./HttpService"


async function get(){
   return await HttpService.get('/Oruzje')
    .then((odgovor)=>{
        console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Oruzje/' + sifra)
     .then((odgovor)=>{
         return {greska: false, poruka: odgovor.data}
     })
     .catch((e)=>{
        return {greska: true, poruka: 'Oruzje s ovom šifrom ne postoji!'}
     })
 }

async function obrisi(sifra) {
    return await HttpService.delete('/Oruzje/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Oruzje se ne može obrisati.'}
    })
}

async function dodaj(oruzje) {
    return await HttpService.post('/Oruzje', oruzje)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Oruzje se ne može dodati!'}
    })
}

async function promjena(sifra,oruzje) {
    return await HttpService.put('/Oruzje/', + sifra, oruzje)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Oruzje se ne može promjeniti!'}
    })
}


export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}