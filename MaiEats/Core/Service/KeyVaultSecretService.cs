using MaiEats.Core.Interfaces;
using Microsoft.Azure.KeyVault;

namespace MaiEats.Core.Service;

public class KeyVaultSecretService : IKeyVaultSecretService
{
    private readonly IKeyVaultClient _keyVaultClient;
    private readonly string _vaultBaseUrl;
    private readonly string _secretName;
    public KeyVaultSecretService(IKeyVaultClient keyVaultClient, IConfiguration config)
    {
        _keyVaultClient = keyVaultClient;
        _vaultBaseUrl = config["KeyVault:KeyVaultURL"];
        _secretName = config["KeyVault:SecretName"];
    }
    public async Task<string> GetSecretAsync(string secretName)
    {
        var secretUri = $"{_vaultBaseUrl}/secrets/{_secretName}";
        var secret = await _keyVaultClient.GetSecretAsync(secretUri);

        return secret.Value;
    }
}