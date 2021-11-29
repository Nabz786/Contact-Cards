namespace ContactListAPI.Domain.Models.Responses
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
