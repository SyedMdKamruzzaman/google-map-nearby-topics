namespace SetScheduleAPI
{
    public static class AppSettingsReader
    {
        public static string GetBaseURL()
        {
            return ConfigurationManager.AppSetting["Map:BASE_URL"];
        }
        public static string GetMapAPIKey()
        {
            return ConfigurationManager.AppSetting["Map:API_KEY"];
        }

        public static string GetGeocodeUrl()
        {
            return ConfigurationManager.AppSetting["Map:GEOCODE"];
        }
        public static string GetNearbyPlacesUrl()
        {
            return ConfigurationManager.AppSetting["Map:NearbyPlaces"];
        }
        public static string GetOutputFormat()
        {
            return ConfigurationManager.AppSetting["Map:OutputFormat"];
        }

    }
}
