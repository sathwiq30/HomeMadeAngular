import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


  constructor() {}
   address = ''
   @Output() geoPoint = new EventEmitter<any>();
   @Output() adress = new EventEmitter<string>();
  ngOnInit() {

  }
  send(){
    this.adress.emit(this.address)
  }
  onGeoPoint(event){
    this.geoPoint.emit(event)
  }
  
}
