using Microsoft.AspNetCore.Mvc;
using ZavrsnaAPP.Data;
using ZavrsnaAPP.Models;

namespace ZavrsnaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class OruzjeController : ControllerBase
    {

        private readonly ZavrsnaContext _context;
        public OruzjeController(ZavrsnaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Oruzja);
            }

            catch (Exception ex) { return BadRequest(ex.Message); }
        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Oruzja.Find(sifra));
        }


        [HttpPost]
        public IActionResult Post(Oruzje oruzje)
        {
            _context.Oruzja.Add(oruzje);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, oruzje);
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Oruzje oruzje)
        {
            var oruzjeIzBaze = _context.Oruzja.Find(sifra);

            oruzjeIzBaze.Naziv = oruzje.Naziv;
            oruzjeIzBaze.Kalibar = oruzje.Kalibar;
            oruzjeIzBaze.Cijena = oruzje.Cijena;
            oruzjeIzBaze.Tezina = oruzje.Tezina;
            oruzjeIzBaze.Proizvodac = oruzje.Proizvodac;
            oruzjeIzBaze.Kapacitetspremnika = oruzje.Kapacitetspremnika;
            oruzjeIzBaze.Godinaproizvodnje = oruzje.Godinaproizvodnje;

            _context.Oruzja.Update(oruzjeIzBaze);
            _context.SaveChanges();

            return Ok(new {poruka= "Done..."});
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var oruzjeIzBaze = _context.Oruzja.Find(sifra);
            _context.Oruzja.Remove(oruzjeIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Deleted..." });
        }
    }
}
