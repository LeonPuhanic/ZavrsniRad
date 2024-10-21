import { HttpService } from "./HttpService"


async function get(){
   return await HttpService.get('/Optika')
    .then((odgovor)=>{
        console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Optika/' + sifra)
     .then((odgovor)=>{
         return {greska: false, poruka: odgovor.data}
     })
     .catch((e)=>{
        return {greska: true, poruka: 'Optika s ovom šifrom ne postoji!'}
     })
 }

async function obrisi(sifra) {
    return await HttpService.delete('/Optika/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Optika se ne može obrisati.'}
    })
}

async function dodaj(optika) {
    return await HttpService.post('/Optika', optika)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Optika se ne može dodati!'}
    })
}

async function promjena(sifra,optika) {
    return await HttpService.put('/Optika/' + sifra, optika)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Optika se ne može promjeniti!'}
    })
}


export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}