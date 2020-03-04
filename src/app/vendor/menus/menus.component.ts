import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
    private router: Router,private route: ActivatedRoute) { }
  menu 
  isOpen
  items: Observable<any[]>;
  ngOnInit() {
    this.items = this.firestore.collection('catogories',ref => ref.where('uid', '==', 'yiDtTBrdQxMr82Z37P4rQz4aCJK2')).valueChanges({ idField: 'id' });
    this.items.subscribe(i=> this.menu = i )
  }
  loadItems(a:string) {
    this.router.navigate(['item/'+a], {relativeTo: this.route});
  }
  openGroup(a: number){
    this.isOpen=a;
  }

}
