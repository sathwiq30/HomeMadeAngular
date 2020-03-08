import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loaded = false
  constructor(private firestore: AngularFirestore,private router: Router,private route: ActivatedRoute) { }
  orders
  
  items: Observable<any[]>;
  ngOnInit() {
    this.items = this.firestore.collection('orders',ref => ref.where('uid', '==', 'vwTj6BHuESaNgjffflnbrdZ6eWV2')).valueChanges({ idField: 'id' });
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
