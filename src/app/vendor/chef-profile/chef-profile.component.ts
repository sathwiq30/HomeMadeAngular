import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chef-profile',
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css']
})
export class ChefProfileComponent implements OnInit {

  constructor( private firestore : AngularFirestore,private auth : AngularFireAuth) { }
  chef
  text = ''
  image = ''
  address= ''
  geoPoint
  ngOnInit() {
    this.firestore.collection('chef').doc(this.auth.auth.currentUser.uid).valueChanges()
          .subscribe(i=> {

            this.chef= i
            
            console.log(i)
          })
  }
  onAddress(a){
    this.address = a
  }
  onGeoPoint(a){
    this.geoPoint = a
    console.log(a)
  }
  onToggle(id, bool){
    this.firestore.collection('chef').doc(this.auth.auth.currentUser.uid).update({availability : bool})
  }
  onSubmit(){
    
    this.firestore.collection('chef').doc(this.auth.auth.currentUser.uid).set({ 'restaurentName' : this.text, displayImage : this.image,verified : 0, availability : false , 'uid' :  this.auth.auth.currentUser.uid })
    this.text=''
    this.image = ''
  }

}
