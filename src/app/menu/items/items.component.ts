import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private firestore: AngularFirestore,private auth : AngularFireAuth) { }
  id
  items: Observable<any[]>;
  item 
  loaded = false
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id =  params.id
     console.log(this.id)
     this.items = this.firestore.collection('menu',ref => ref.where('cid', '==', this.id)).valueChanges({ idField: 'id' });
     this.items.subscribe(i=>{
        this.item = i 
        this.loaded = true
      })
    });
  }
  onAdd(id){
    this.firestore.collection('cart').add({'itemId': id, 'uid': this.auth.auth.currentUser.uid})
  }
}
