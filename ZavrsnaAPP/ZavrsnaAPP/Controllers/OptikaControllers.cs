using Microsoft.AspNetCore.Mvc;
using ZavrsnaAPP.Data;
using ZavrsnaAPP.Models;

namespace ZavrsnaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]

    public class OptikaController : ControllerBase
    {

        private readonly ZavrsnaContext _context;
        public OptikaController(ZavrsnaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Optike);
            }

            catch (Exception ex) { return BadRequest(ex.Message); }
        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Optike.Find(sifra));
        }


        [HttpPost]
        public IActionResult Post(Optika optika)
        {
            _context.Optike.Add(optika);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, optika);
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Optika optika)
        {
            var optikaIzBaze = _context.Optike.Find(sifra);

            optikaIzBaze.Naziv = optika.Naziv;
            optikaIzBaze.Cijena = optika.Cijena;
            optikaIzBaze.Magnifikacija = optika.Magnifikacija;
            optikaIzBaze.Tezina = optika.Tezina;
            optikaIzBaze.Proizvodac = optika.Proizvodac;

            _context.Optike.Update(optikaIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Done..." });
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var optikaIzBaze = _context.Optike.Find(sifra);
            _context.Optike.Remove(optikaIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Deleted..." });
        }
    }
}
