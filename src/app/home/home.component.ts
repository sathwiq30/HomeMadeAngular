import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import * as firebaseApp from 'firebase/app'
import * as geofirex from 'geofirex'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loaded = false
  location =false 
  locationAccess = false
  geo = geofirex.init(firebaseApp);
  constructor(private fire : AngularFirestore,public router : Router,private mapsAPILoader: MapsAPILoader) { }
  chef
  latitude: number;
  longitude: number;
  zoom: number;
  ngOnInit() {
    // this.fire.collection('chef').valueChanges({ idField: 'id' })
    // .subscribe(i=> {
    //   console.log(i)
    //   this.chef=i
    //   this.loaded = true
    // })
    // this.setCurrentLocation()
    this.mapsAPILoader.load().then(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
          console.log(this.latitude)
          let point =this.geo.point(this.latitude,this.longitude)
          console.log(point)
          this.setCurrentLocation(point)
          this.locationAccess = true
          // this.getAddress(this.latitude, this.longitude);
        });
      } 
    })
  }
  onLocation(){
    (this.location) ? this.location = false : this.location = true
  }
  onRoute(chef){
    console.log(chef)
    this.router.navigate(['menu/'+chef.id],{ state :{ chef : chef } })
  }
  onGeoPoint(event){
     console.log(event)
     this.setCurrentLocation(event)
  }
  private setCurrentLocation(point) {
    const chef = this.fire.collection('chef')
    // const center  = this.geo.point(this.latitude, this.longitude)
    const field = 'point'
        const radius = 100000000;
  
        const query = this.geo.query(chef.ref).within(point, radius, field)
        query.subscribe(i =>  {
          this.chef=i
          this.loaded = true
        });   
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //     this.zoom = 8;
    //     console.log(this.latitude)
    //   });
    // }  
  }
}
