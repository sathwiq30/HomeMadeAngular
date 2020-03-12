import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private auth : AngularFireAuth) { }
  text = ''
  ngOnInit() {
  }
  onSubmit(){
    this.firestore.collection('catogories').add({ 'name' : this.text, 'uid' :  this.auth.auth.currentUser.uid })
    this.text=''
  }

}
