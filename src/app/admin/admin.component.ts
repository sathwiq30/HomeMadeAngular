import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private firestore : AngularFirestore,private http: HttpClient) { }
  chefs
  ngOnInit() {
    this.firestore.collection('customClaims').valueChanges({ idField: 'id' })
      .subscribe(i=> {
        this.chefs=i
        console.log(this.chefs)
      })
  }
  add(i){
    this.http.post('https://us-central1-homemade-45afb.cloudfunctions.net/app/setCustomClaims/',
    { 
      uid : i.uid
    }
    )
    .subscribe(
      i=> {
        console.log(i)
        
      },
    error=> {
      console.log(error)
    })
    
  }

}
