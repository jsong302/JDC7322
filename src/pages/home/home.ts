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

  x: number = 0;
  y: number = 0;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
 
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
 
 	
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 

 	  console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        /*styles: styles,
        disableDefaultUI: true*/

      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: latLng
	  });
 
    }, (err) => {
      console.log(err + "hi");
    }); 
 
  }

  showMyLocation() {

    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((position) => {
	  this.x = position.coords.longitude;
	  this.y = position.coords.latitude;

	  let latLng = new google.maps.LatLng(this.y, this.x);
	  console.log(latLng);
	  this.marker.setPosition(latLng);

	}, (err) => {
	  console.log(err);
	});
  }
}