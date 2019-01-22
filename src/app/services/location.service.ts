import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LocationService {
	constructor(private http: HttpClient) {}
  
  	getLocationName(lat, long){
        return this.http.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+long+'&key=5ac55f78b89a43678c2bcf5b3f6688ba');
    }

    getWeather(lat, long){
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        return this.http.get(proxy + 'https://api.darksky.net/forecast/282e9215c054bb86412b43dc7c65b14e/'+lat+','+long)
    }

    getTopArtists(country){
        return this.http.get('https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country='+country+'&api_key=3315a90b65145a820ba8482b23dc0460&format=json')
    }

    getTopTracks(country){
        return this.http.get('https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country='+country+'&api_key=3315a90b65145a820ba8482b23dc0460&format=json')
    }

    getSearchdata(query){
        return this.http.get('https://www.googleapis.com/youtube/v3/search?q='+query+'&maxResults=5&type=video&part=snippet,id&key=AIzaSyBqAMXK-VaTi0aic4o1AeHoCaBR1ylx9Ik&videoEmbeddable=true')
    }

}