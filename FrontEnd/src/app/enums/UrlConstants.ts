import { environment } from "src/environments/environment";


export const UrlConstants = {

    // BaseUrl
    apiUrl: environment.apiUrl,
    
    // security  
    login:"Authenticate/login",    
    logout:"Authenticate/logout",
    
    //Map
    getNearbyPlacesList:"Map/GetNearbyPlaces",

};