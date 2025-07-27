namespace Mat.Database.Model;

public class Tracker
{
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime? ModifiedDate { get; set; } = null;
}
