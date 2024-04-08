public class YelpFusionBusiness
{
    public string Id { get; set; }
    public string Name { get; set; }
    public List<Category> Categories { get; set; }
    public Location Location { get; set; }
}

public class Category
{ 
    public string Title { get; set; }
}

public class Location
{
    public string Address1 { get; set; }
    public string City { get; set; }
    public string Zip_Code { get; set; }
    public string Country { get; set; }
    public string State { get; set; }
}