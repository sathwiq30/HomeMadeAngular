import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  constructor(public auth : AngularFireAuth) { }

  ngOnInit() {

  }
  logout() {
    this.auth.auth.signOut();
  }
}
