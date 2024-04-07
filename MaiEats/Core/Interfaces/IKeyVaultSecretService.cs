namespace MaiEats.Core.Interfaces;

public interface IKeyVaultSecretService
{
    Task<string> GetSecretAsync (string secretName);
    
}