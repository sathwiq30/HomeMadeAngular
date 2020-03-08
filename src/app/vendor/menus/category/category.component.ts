import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }
  text = ''
  ngOnInit() {
  }
  onSubmit(){
    this.firestore.collection('catogories').add({ 'name' : this.text, 'uid' :  'yiDtTBrdQxMr82Z37P4rQz4aCJK2' })
    this.text=''
  }

}
