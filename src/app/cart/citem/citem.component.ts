import { Component, OnInit,Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
@Component({
  selector: 'app-citem',
  templateUrl: './citem.component.html',
  styleUrls: ['./citem.component.css']
})
export class CitemComponent implements OnInit {
  
  constructor(private firestore: AngularFirestore,) { }
  @Input() id
  items: Observable<any>;
  item 
  ngOnInit() {
     this.items = this.firestore.collection('menu').doc(this.id).valueChanges();
     this.items.subscribe(i=> this.item = i )
  }

}
