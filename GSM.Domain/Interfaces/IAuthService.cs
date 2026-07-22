namespace GSM.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<string> Login(string userName, string password);
    }
}