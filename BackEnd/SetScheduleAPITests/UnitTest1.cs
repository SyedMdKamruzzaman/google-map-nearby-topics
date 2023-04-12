using System.Configuration;
using System;
using SetScheduleAPI.RepositoryImpl;
using SetScheduleAPI.Models.ViewModel;
using SetScheduleAPI;

namespace SetScheduleAPITests;

public class Tests
{
    [Author("Syed Md. Kamruzzaman")]
    [Test]
    public void GetLatLongByAddressTest()
    {
        MapRepository mapRepository = new MapRepository();
        var notExpected = string.Empty;
        var latLong = mapRepository.GetLatLongByAddress("USA");
        Assert.That(latLong, Is.Not.EqualTo(notExpected));
    }

    [Author("Syed Md. Kamruzzaman")]
    [Test]
    public void GetGoogleMapTest()
    {
        MapRepository mapRepository = new MapRepository();
        GoogleMap googleMap = new GoogleMap();
        string url = AppSettingsReader.GetBaseURL() + AppSettingsReader.GetGeocodeUrl() + AppSettingsReader.GetOutputFormat() + "?" + "address=USA&key=" + AppSettingsReader.GetMapAPIKey();
        googleMap = mapRepository.GetGoogleMap(url);
        Assert.That(googleMap, Is.Not.EqualTo(null));
    }




}