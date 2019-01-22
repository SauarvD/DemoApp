import { Component, OnInit, NgZone } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LocationService} from '../services/location.service';
import { Router } from '@angular/router';
declare var gapi: any;
@Component({
  selector: 'app-postLogin',
  templateUrl: './postLogin.component.html',
  styleUrls: ['./postLogin.component.css']
})
export class postLoginComponent implements OnInit {

  constructor(private router: Router,
              private ngZone: NgZone,
              private authenticationService: AuthService,
              private getLocationService: LocationService) { 
  }

  public profile: any = {};
  public linkToRoute: any = [];
  public lat:any = {};
  public long:any = {};
  public locationLoader:Boolean = true;
  public weatherLoader:Boolean = true;
  public locationData:Object = {};
  public weatherData:Object = {};
  public play:Boolean = false;
  public audio = new Audio();
  public loaderData = [1,2,3,4,5,6,7,8,9,10];
  public contentLoaded: Boolean = false;
  public listData: any = [];
  public tracksList: any = [];
  public artistsList: any = [];
  public searchListData: any = [];
  public videoId:any = null;
  public youtubeData:Boolean = false;
  songName: any;

  ngOnInit() {
    this.lat = localStorage.getItem('lat');
    this.long = localStorage.getItem('long');
    console.log(this.lat, this.long);
    if(this.lat && this.long){
      this.getLocationService.getLocationName(this.lat, this.long).subscribe(
        data => {this.setLocation(data)},
        err => {console.log('err',err)}
      )
      this.getLocationService.getWeather(this.lat, this.long).subscribe(
        data => {this.setWeather(data)},
        err => {console.log('err',err)}
      ) 
    }
    this.profile['image'] = localStorage.getItem('Image');
    this.profile['name'] = localStorage.getItem('Name');
  }

  searchSong(){
    var data = this.songName;
    this.getLocationService.getSearchdata(data).subscribe(
      data => {this.massageSearchData(data)},
      err => {console.log('err',err)}
    )
    this.songName = '';
  }

  playTrack(name,artist){
    if(this.listData[0].key === 'records'){
      this.audio.pause();
      this.youtubeData = true;
      let data = name+' '+artist;
      this.getLocationService.getSearchdata(data).subscribe(
        data => {this.massageTrackData(data)},
        err => {console.log('err',err)}
      )
    }
  }

  playSong(videoId){
    this.youtubeData = true;
    this.audio.pause();
    this.videoId = videoId;
    var iframeId = document.getElementById('ytplayer');
    this.play = true;
    iframeId.setAttribute( "src", "https://www.youtube.com/embed/"+ this.videoId +"?enablejsapi=1&rel=0&showinfo=0&autoplay=1" );
  }

  massageTrackData(data){
    this.videoId = data.items[0].id.videoId;
    var iframeId = document.getElementById('ytplayer');
    this.play = true;
    iframeId.setAttribute( "src", "https://www.youtube.com/embed/"+ this.videoId +"?enablejsapi=1&rel=0&showinfo=0&autoplay=1" );
  }

  massageSearchData(data){
    this.searchListData = [];
    data.items.map((item)=>{
      var obj={
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        image: item.snippet.thumbnails.high.url
      }
      this.searchListData.push(obj);
    })
    console.log(this.searchListData);
  }

  playMusic(){
    if(!this.youtubeData){
      this.audio.src = "../../assets/audio/sound.mp3";
      this.audio.load();
      this.audio.play();
      this.audio.volume = 0.3;
    } else {
      var div = document.getElementsByClassName("video-player")[0];
      var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
      iframe.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    this.play = true;
  }

  pauseMusic(){
    if(!this.youtubeData){
      this.audio.pause();
    } else {
      var div = document.getElementsByClassName("video-player")[0];
      var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
      iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }    
    this.play = false;
  }

  setLocation(data){
    this.getLocationService.getTopTracks(data.results[0].components.country).subscribe(
      data => {this.setTrackData(data)},
      err => {console.log('err',err)}
    )
    this.getLocationService.getTopArtists(data.results[0].components.country).subscribe(
      data => {this.setArtistData(data)},
      err => {console.log('err',err)}
    )
    this.locationData['city'] = data.results[0].components.city;
    this.locationData['suburb'] = data.results[0].components.suburb;
    this.locationLoader = false;
  }

  setTrackData(data){
    data = data.tracks.track.slice(0,5);
    var trackData = [];
    data.map((item)=>{
      var obj = {}
      obj['artistName'] = item.artist.name;
      obj['name'] = item.name;
      obj['image'] = item.image[item.image.length - 1]["#text"];
      trackData.push(obj);
    })
    var tracks = {
      data: trackData,
      description: 'Some most popular tracks in your country',
      value: 'See Top Artists',
      key: 'records'
    }
    this.tracksList.push(tracks);
    this.listData = this.tracksList;
    this.contentLoaded = true
  }

  setArtistData(data){
    data = data.topartists.artist.slice(0,5);
    var artistData = [];
    data.map((item)=>{
      var obj = {}
      obj['name'] = item.name;
      obj['image'] = item.image[item.image.length - 1]["#text"];
      artistData.push(obj);
    })
    var tracks = {
      data: artistData,
      description: 'Some most popular artists in your country',
      value: 'See Top Tracks',
      key: 'individuals'
    }
    this.artistsList.push(tracks);
  }

  reArrange(){
    if(this.listData[0].key === 'records'){
      this.listData = this.artistsList
    } else {
      this.listData = this.tracksList;
    }
  }

  setWeather(data){
    var getElement = <HTMLElement>document.getElementsByClassName('homepage')[0];
    var iconValue, genre;
    this.weatherData['temp'] = Math.round((data.currently.temperature -32) * 5 / 9);
    this.weatherLoader = false;
    switch(data.currently.icon){
      case "clear-day": iconValue = 'clear sunny day';
                        genre = 'get a load of lively and energetic music';
      break;
      case 'clear-night': iconValue = 'clear night';
                          genre = 'tune in to accoustic and soulful music';
      break;
      case 'cloudy': iconValue = 'cloudy day';
                    genre = 'lend an ear to upbeat and strong music';
      break;
      case 'partly-cloudy-day': iconValue = 'partly cloudy day';
                                genre = 'lend an ear to upbeat and strong music';
      break;
      case 'partly-cloudy-night': iconValue = 'partly cloudy night';
                                  genre = 'tune in to accoustic and soulful music';
      break;
      case 'fog': iconValue = 'foggy day';
                  genre = 'get a load of playful and orchestral music';
      break;
      case 'rain': iconValue = 'rainy day';
                   genre = 'tune in to mellow and lyrical music';
      break;
      case 'snow': iconValue = 'snowy day';
                   genre = 'tune in to resonant and strong music';
      break;
      case 'windy': iconValue = 'windy day';
                    genre = 'lend an ear to warm and heroic music';
      break;
      default: iconValue = 'perfect day';
               genre = 'listen to your perfect song';
      break;
    }
    this.weatherData['icon'] = iconValue;
    this.weatherData['genre'] = genre;
  }

  signout(){
    localStorage.clear();
    let self=this
    gapi.load('auth2', function () {
        var auth2 = gapi.auth2.init({
            client_id: '292747500846-rvhar8jo5sr536kkap5seadjqdi0sbj5.apps.googleusercontent.com'
        })
        auth2.then(function (){
          auth2.signOut();
          self.router.navigate(['/home']);
        });
    });
  }

}
