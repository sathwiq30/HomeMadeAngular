import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chefsprofile',
  templateUrl: './chefsprofile.component.html',
  styleUrls: ['./chefsprofile.component.css']
})
export class ChefsprofileComponent implements OnInit {

  constructor( private firestore : AngularFirestore,private route: ActivatedRoute) { }
  chef
  text = ''
  image = ''
  address= ''
  geoPoint
  id
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.id)
      this.id = params.id
      this.firestore.collection('chef').doc(params.id).valueChanges()
            .subscribe(i=> {

              this.chef= i
              
              console.log(i)
            })
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
    this.firestore.collection('chef').doc(this.id).update({availability : bool})
  }
  onSubmit(){
    
    this.firestore.collection('chef').doc(this.id).set({ 'restaurentName' : this.text, displayImage : this.image,verified : 0, availability : false , 'uid' :  this.id, point :  this.geoPoint })
    this.text=''
    this.image = ''
  }

}
