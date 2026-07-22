using GSM.Application.Responses.UserResponses;
using GSM.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.Queries.UserQuerie
{
    public class GetAllUsersQuerie : IRequest<List<GetAllUsersResponse>>
    {
        
    }
}
