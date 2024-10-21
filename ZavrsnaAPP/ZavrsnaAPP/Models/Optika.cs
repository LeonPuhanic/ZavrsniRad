namespace ZavrsnaAPP.Models
{
    public class Optika : Entitet
    {
        public string Naziv { get; set; }
        public decimal? Cijena { get; set; }
        public string? Magnifikacija { get; set; }
        public int? Tezina { get; set; }
        public int Proizvodac { get; set; }
    }
}