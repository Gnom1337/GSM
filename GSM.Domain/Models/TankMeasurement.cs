using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text;

namespace GSM.Domain.Models
{
    public class TankMeasurement
    {
        [Key]
        public int TankMeasurementsId {  get; set; }
        [ForeignKey(nameof(TankId))]
        public int TankId {  get; set; }
        public Tank Tank { get; set; }
        public DateTime MeasuredAt { get; set; }
        public double VolumeLiters {  get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public User User { get; set; }
        public string? Note { get; set; }
    }
}
