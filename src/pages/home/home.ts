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
      var styles = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":"0.5"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"lightness":"-50"},{"saturation":"-50"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"hue":"#009aff"},{"saturation":"25"},{"lightness":"0"},{"visibility":"simplified"},{"gamma":"1"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"saturation":"0"},{"lightness":"100"},{"gamma":"2.31"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":"20"},{"gamma":"1"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"saturation":"-100"},{"lightness":"-100"}]},{"featureType":"landscape","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"45"},{"gamma":"4.24"},{"visibility":"simplified"},{"hue":"#00ff90"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"saturation":"-100"},{"color":"#f5f5f5"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#666666"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"saturation":"-25"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"lightness":"50"},{"gamma":".75"},{"saturation":"100"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}];

 	  console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styles,
        disableDefaultUI: true

      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: latLng
	  });
 
    }, (err) => {
      console.log(err);
    }); 
 
  }

  showMyLocation() {

    this.geolocation.watchPosition().subscribe((position) => {
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