using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Serilog;
using SetScheduleAPI.Models.ViewModel;
using SetScheduleAPI.Services;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace SetScheduleAPI.RepositoryImpl
{
    public class MapRepository : IMap
    {
        const double MILES_TO_KM = 1.60934;
        const int KM_TO_METER = 1000;
        public List<NearbyTopics> GetNearbyTopicList(MapInput mapInput)
        {
            mapInput.Distance = Convert.ToInt32(Math.Round(mapInput.Distance * MILES_TO_KM * KM_TO_METER));
            string location = GetLatLongByAddress(mapInput.Address);
            string url = AppSettingsReader.GetBaseURL() + AppSettingsReader.GetNearbyPlacesUrl() + AppSettingsReader.GetOutputFormat() + "?" + "location="+ location + "&name=" + mapInput.Topic + "&radius=" + mapInput.Distance + "&key=" + AppSettingsReader.GetMapAPIKey();
            GoogleMap googleMap = new GoogleMap();
            googleMap = GetGoogleMap(url);
            List<NearbyTopics> nearbyTopicList = googleMap.results.Select(s => new NearbyTopics {Name = s.name, Latitude= s.geometry.location.lat, Longitude= s.geometry.location.lng }).ToList();
            return nearbyTopicList;
        }
        public string GetLatLongByAddress(string address)
        {
            string latLong = string.Empty;
            string url = AppSettingsReader.GetBaseURL() + AppSettingsReader.GetGeocodeUrl() + AppSettingsReader.GetOutputFormat() + "?" + "address="+ address + "&key=" + AppSettingsReader.GetMapAPIKey();
            GoogleMap googleMap= new GoogleMap();
            try
            {
                googleMap = GetGoogleMap(url);
                if (googleMap!=null && googleMap.results.Count > 0)
                {
                    latLong = googleMap.results[0].geometry.location.lat + "," + googleMap.results[0].geometry.location.lng;
                }
            }
            catch(Exception ex)
            {
                Log.Error(ex.Message.ToString());
            }
            return latLong; 
        }

        public GoogleMap GetGoogleMap(string url)
        {
            GoogleMap googleMap =new GoogleMap();
            using var httpClient = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var response = httpClient.Send(request);
            using var reader = new StreamReader(response.Content.ReadAsStream());
            googleMap = JsonConvert.DeserializeObject<GoogleMap>(reader.ReadToEnd());
            return googleMap;
        }

    }
}
