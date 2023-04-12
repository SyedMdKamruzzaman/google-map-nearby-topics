using SetScheduleAPI.Models.ViewModel;

namespace SetScheduleAPI.Services
{
    public interface IMap
    {
        List<NearbyTopics> GetNearbyTopicList(MapInput mapInput);
    }
}
