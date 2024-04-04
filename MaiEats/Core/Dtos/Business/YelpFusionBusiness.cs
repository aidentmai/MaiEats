namespace MaiEats.Core.Dtos.Business;

public class YelpFusionBusiness
{
    public string id { get; set; }
    public string name { get; set; }
    public string address1 { get; set; }
    public string city { get; set; }
    public string zip_code { get; set; }
    public string country { get; set; }
    public string state { get; set; }
    public string title { get; set; } // Category
    public string? phone { get; set; }
    public string? display_phone { get; set; }
}