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
  isAdmin = false
  isChef = false
  ngOnInit() {
    let user = this.auth.auth.currentUser;

    this.auth.idTokenResult.subscribe(i=> {
      if(i !== null){
        if(i.claims.admin){
          this.isAdmin = i.claims.admin
          // this.isChef = i.claims.admin
        }
        
        
        if(i.claims.chef){
          this.isChef = i.claims.chef
        }
      }
      console.log(this.isAdmin)
      console.log(this.isChef)
    })
    
  }
  logout() {
    this.auth.auth.signOut();
    this.router.navigateByUrl('login')
    this.isAdmin = false
    this.isChef = false
  }
}
