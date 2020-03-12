import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loaded = false
  constructor(private fire : AngularFirestore,public router : Router) { }
  chef
  ngOnInit() {
    this.fire.collection('chef').valueChanges({ idField: 'id' })
      .subscribe(i=> {this.chef=i
        this.loaded = true
      })
  }
  onRoute(chef){
    this.router.navigate(['menu/'+chef.id],{ state :{ chef : chef } })
  }
}
