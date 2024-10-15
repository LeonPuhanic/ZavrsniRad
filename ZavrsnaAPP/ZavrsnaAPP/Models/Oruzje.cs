namespace ZavrsnaAPP.Models
{
    public class Oruzje:Entitet
    {
        public string Naziv { get; set; }
        public string? Kalibar { get; set; }
        public decimal? Cijena { get; set; }
        public int? Tezina { get; set; }
        public int Proizvodac { get; set; }
        public int? Kapacitetspremnika { get; set; }
        public int? Godinaproizvodnje { get; set; }
    }
}
