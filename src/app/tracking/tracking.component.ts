import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor() { }
  icon
  ngOnInit() {
    this.icon = {
      url: 'https://www.materialui.co/materialIcons/action/motorcycle_black_192x192.png',
      scaledSize: {
        width: 30,
        height: 30
      }
    }
    
  }

}
