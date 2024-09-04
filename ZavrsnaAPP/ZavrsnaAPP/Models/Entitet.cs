using System.ComponentModel.DataAnnotations;

namespace ZavrsnaAPP.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra { get; set; }
    }
}
