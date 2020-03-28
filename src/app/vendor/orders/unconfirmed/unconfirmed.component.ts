import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-unconfirmed',
  templateUrl: './unconfirmed.component.html',
  styleUrls: ['./unconfirmed.component.css']
})
export class UnconfirmedComponent implements OnInit {

  constructor(private firestore: AngularFirestore,private router: Router,private route: ActivatedRoute, private auth : AngularFireAuth) { }
  orders
  items: Observable<any[]>;
  ngOnInit() {
    this.items = this.firestore.collection('orders',
    ref => 
      ref.where('chefId', '==', this.auth.auth.currentUser.uid ) 
         .where('status','==',0)
    ).valueChanges({ idField: 'id' });
    this.items.subscribe((items:any)=> {
      this.orders=items; 
      console.log(this.orders)
    } )
    
  }

  onDelete(id){
    this.firestore.collection('orders').doc(id).update({'status' : 5})
  } 
  onAccept(id){
    this.firestore.collection('orders').doc(id).update({'status' : 1})
    
  }
  
}
