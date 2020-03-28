import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private firestore : AngularFirestore,private http: HttpClient, private router : Router) { }
  chefs
  aproved
  ngOnInit() {
    this.firestore.collection('customClaims').valueChanges({ idField: 'id' })
      .subscribe(i=> {
        this.chefs=i
        console.log(this.chefs)
      })
    this.firestore.collection('chefClaims').valueChanges({ idField: 'id' })
    .subscribe(i=> {
      this.aproved=i
      console.log(this.aproved)
    })
  }
  async add(i){
    this.http.post('https://us-central1-homemade-45afb.cloudfunctions.net/app/setCustomClaims/',
    // this.http.post('http://localhost:5001/homemade-45afb/app/setCustomClaims/ ',
    { 
      uid : i.uid
    }
    )
    .subscribe(
      async (msg) => {
        console.log(msg)
        await this.firestore.collection('customClaims').doc(i.id).delete()
        await this.firestore.collection('chefClaims').add({email : i.email, uid : i.uid})
      },
    error=> {
      console.log(error)
    })
    
  }
  delete(i){
    this.firestore.collection('customClaims').doc(i.id).delete()
  }
  navigate(uid){
    this.router.navigateByUrl('/chef/'+uid)
  }

}
