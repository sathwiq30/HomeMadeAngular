import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private firestore: AngularFirestore,private router: Router,private route: ActivatedRoute,private auth :AngularFireAuth) { }
  orders
  loaded= false
  items: Observable<any[]>;
  ngOnInit() {
    this.items = this.firestore.collection('orders',
    ref => 
      ref
      .where('chefId', '==', this.auth.auth.currentUser.uid) 
    ).valueChanges({ idField: 'id' });
    this.items.subscribe((items:any)=> {
      this.orders=items; 
      this.loaded = true
      items.map((i:any,id)=>{
        if(i.status == 0 ){
          this.orders[id].status = 'unconfirmed'
        }else if(i.status == 1){
          this.orders[id].status = 'preparing'
        }
        else if(i.status == 2){
          this.orders[id].status = 'prepared'
        }
        else if(i.status == 3){
          this.orders[id].status = 'order picked up'
        }
        else if(i.status == 4){
          this.orders[id].status = 'delivered'
        }else{
          this.orders[id].status = 'rejected'
        }
      })
      console.log(this.orders)
    } )
  }
}
