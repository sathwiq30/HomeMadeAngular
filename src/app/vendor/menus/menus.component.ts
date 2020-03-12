import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
    private router: Router,private route: ActivatedRoute,private auth : AngularFireAuth) { }
  menu 
  isOpen
  items: Observable<any[]>;
  ngOnInit() {
    console.log()
    this.items = this.firestore.collection('catogories',ref => ref.where('uid', '==',this.auth.auth.currentUser.uid)).valueChanges({ idField: 'id' });
    this.items.subscribe(i=> this.menu = i )
  }
  loadItems(a:string) {
    this.router.navigate(['item/'+a], {relativeTo: this.route});
  }
  openGroup(a: number){
    this.isOpen=a;
  }
  onDelete(id){
    this.firestore.collection('catogories').doc(id).delete()
  }

}
