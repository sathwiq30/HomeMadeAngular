import { Component, OnInit, AfterContentInit , Output, EventEmitter} from '@angular/core';
import * as firebaseApp from 'firebase/app'
import * as geofirex from 'geofirex'; 
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { MapsAPILoader } from '@agm/core'; 
declare var google: any;
@Component({
  selector: 'app-map-address',
  templateUrl: './map-address.component.html',
  styleUrls: ['./map-address.component.css']
})
export class MapAddressComponent implements OnInit, AfterContentInit {
  geo = geofirex.init(firebaseApp);
  points : Observable<any> 
  constructor(private firestore : AngularFirestore,private mapsAPILoader: MapsAPILoader) { }
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @Output() geoPoint = new EventEmitter<any>();
  // google
  ngOnInit() {
    
    // const cities = this.firestore.collection('cities');
    // const center = this.geo.point(40,50)
    // const radius = .5
    // const field = 'pos'
    // const query = this.geo.query(cities).within(center, radius, field);
  }
  ngAfterContentInit(){
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    })
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        console.log(this.latitude)
        let point =this.geo.point(this.latitude,this.longitude)
        console.log(point)
        this.geoPoint.emit(point)
        // this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event ) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    let point =this.geo.point(this.latitude,this.longitude)
    console.log(point)
    this.geoPoint.emit(point)
    // this.getAddress(this.latitude, this.longitude);

  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

}
