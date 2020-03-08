import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import {  AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private firestore: AngularFirestore,private auth : AngularFireAuth,
    private router: Router,private route: ActivatedRoute) { }
  menu 
  isOpen
  items: Observable<any[]>;
  menuItems: Observable<any>;
  item 
  price = 0
  address= ''
  loaded = false
  ngOnInit() {
    console.log(this.auth.auth.currentUser)
    this.items = this.firestore.collection('cart',ref => ref.where('uid', '==', 'vwTj6BHuESaNgjffflnbrdZ6eWV2')).valueChanges({ idField: 'id' });
    this.items.subscribe(i=>{
      this.menu=i 
      this.price =0 
      this.item = []
      this.menu.map(m=>{
        this.menuItems = this.firestore.collection('menu').doc(m.itemId).valueChanges();
        this.menuItems.subscribe(i=> {
          if(i!= null){
            i['id'] = m.id
            i['no'] = 1
            this.item.push(i)
            console.log(i)
            this.price = this.price+ parseInt(i.price)
            
          }
          this.loaded = true
         })
      })
    } )
  }
  onAddress(a){
    this.address = a
  }
  onDelete(id){
    this.firestore.collection('cart').doc(id).delete()
  }
  onPlus(i){
    this.item[i].no++
    this.price += parseInt(this.item[i].price)  
  }
  onMinus(i){
    if(parseInt(this.item[i].no )> 0){
      this.item[i].no--
      this.price -= parseInt(this.item[i].price)  
    } 
  }
  onOrder(){
    console.log(this.address)
    this.firestore.collection('orders').add({'items': this.item,'paid': this.price,'uid':'vwTj6BHuESaNgjffflnbrdZ6eWV2','chefId': this.item[0].chefId,'status': 0,'address' : this.address})
  }

}
