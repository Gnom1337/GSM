using GSM.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.DashboardQueries
{
    public class GetAllDataQuerie : IRequest<DashboardDto>
    {
        public DateTime From {  get; set; }
        public DateTime To { get; set; } 
    }
}
