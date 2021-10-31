using System.Collections.Generic;

namespace ContactListAPI.Models
{
    public class ServiceResponse<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T ReturnResource { get; set; }

        public ServiceResponse()
        {
            Success = true;
        }
    }
}
