import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private route: ActivatedRoute,private firestore: AngularFirestore,private auth : AngularFireAuth) { }
  id
  items: Observable<any[]>;
  item 
  text = ''
  price = ''
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id =  params.id
     console.log(this.id)
     this.items = this.firestore.collection('menu',ref => ref.where('cid', '==', this.id)).valueChanges({ idField: 'id' });
     this.items.subscribe(i=> this.item = i )
    });
  }
  onSubmit(){
    this.firestore.collection('menu').add({ 'name' : this.text,price : this.price, 'cid' :  this.id ,'chefId' : this.auth.auth.currentUser.uid , available : true})
    this.price = ''
    this.text = ''
  }
  edit =false
  i
  editText = ''
  editPrice = ''
  itemId 
  onEdit(i){
    this.edit= true
    this.i = i
    this.editPrice=i.price
    this.editText= i.name
    this.itemId = i.id
  }
  onUpdate(){
    this.firestore.collection('menu').doc(this.itemId).update({ 'name' : this.editText,price : this.editPrice, 'cid' :  this.i.cid,'chefId': this.auth.auth.currentUser.uid })
    this.edit = false
    this.i = null
    this.editPrice= null
    this.editText = null
    this.itemId =null

  }
  onDelete(id){
    this.firestore.collection('menu').doc(id).delete()
  }
  onToggle(id, available){
    this.firestore.collection('menu').doc(id).update({ available : available})
  }

}
