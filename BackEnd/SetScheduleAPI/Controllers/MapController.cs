using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SetScheduleAPI.Models.ViewModel;
using SetScheduleAPI.RepositoryImpl;
using SetScheduleAPI.Services;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Xml;

namespace SetScheduleAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        [HttpPost]
        [Route("GetNearbyPlaces")]
        public IActionResult Index([FromForm] MapInput mapInput)
        {            
            IMap mapRepository = new MapRepository();
            List<NearbyTopics> nearbyTopics= new List<NearbyTopics>();
            nearbyTopics = mapRepository.GetNearbyTopicList(mapInput);
            return Ok(nearbyTopics);
        }
        


    }    

}
