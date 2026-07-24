using GSM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Abstractions
{
    public interface ITankRepository
    {
        Task<List<Tank>> GetAllTanksWithProduct();
    }
}
