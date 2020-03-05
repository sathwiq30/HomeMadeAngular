import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-preparing',
  templateUrl: './preparing.component.html',
  styleUrls: ['./preparing.component.css']
})
export class PreparingComponent implements OnInit {

  constructor(private firestore: AngularFirestore,private router: Router,private route: ActivatedRoute) { }
  orders
  items: Observable<any[]>;
  ngOnInit() {
    this.items = this.firestore.collection('orders',
    ref => 
      ref.where('chefId', '==', 'yiDtTBrdQxMr82Z37P4rQz4aCJK2') 
         .where('status','>=',1)
         .where('status','<=',2)
    ).valueChanges({ idField: 'id' });
    this.items.subscribe((items:any)=> {
      this.orders=items; 
      console.log(this.orders)
    } )
    
  }

  onDelete(id){
    this.firestore.collection('orders').doc(id).update({'status' : 3})
  } 
  onAccept(id){
    this.firestore.collection('orders').doc(id).update({'status' : 2})
  }
  
}
