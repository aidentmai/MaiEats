public class YelpFusionBusiness
{
    public string Id { get; set; } = String.Empty;
    public string Name { get; set; } = String.Empty;
    public string image_url { get; set; } = String.Empty;
    public List<Category> Categories { get; set; }
    public Location Location { get; set; }
}

public class Category
{ 
    public string Title { get; set; } = String.Empty;
}

public class Location
{
    public string Address1 { get; set; } = String.Empty;
    public string City { get; set; } = String.Empty;
    public string Zip_Code { get; set; } = String.Empty;
    public string Country { get; set; } = String.Empty;
    public string State { get; set; } = String.Empty;
}