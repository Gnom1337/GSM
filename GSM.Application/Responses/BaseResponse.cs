namespace GSM.Application.Responses
{
    public class BaseResponse<T> where T : class
    {
        public string Status {  get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
