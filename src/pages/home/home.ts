import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locationTracker: LocationTrackerProvider) {

  }
 
  ionViewDidLoad(){

    this.loadMap();
  }
 
  loadMap(){
 
 	/*
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 	  console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP

      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    }); */
 
  }

  addMarker(){
 
	  let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: this.map.getCenter()
	  });
	 
	  let content = "<h4>Information!</h4>";         
	 
	  this.addInfoWindow(marker, content);
 
  }

  addInfoWindow(marker, content){
 
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
	  });
 
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
}