using System;
using System.Collections.Generic;
using System.Text;

namespace GSM.Application.DTOs
{
    public class RecentOperationDto
    {
        public int Id { get; set; }

        /// <summary>
        /// receipt | dispatch | measurement
        /// </summary>
        public string Type { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateTime { get; set; }
    }
}
