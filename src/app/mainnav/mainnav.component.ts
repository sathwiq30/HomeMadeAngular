import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

  constructor(public auth : AngularFireAuth, private router : Router) { }

  ngOnInit() {

  }
  logout() {
    this.auth.auth.signOut();
    this.router.navigateByUrl('login')
  }
}
