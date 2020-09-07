import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cmenus',
  templateUrl: './cmenus.component.html',
  styleUrls: ['./cmenus.component.css']
})
export class CmenusComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
    private router: Router,private route: ActivatedRoute) { }
  menu 
  isOpen
  items: Observable<any[]>;
  id
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
      this.items = this.firestore.collection('catogories',ref => ref.where('uid', '==',this.id)).valueChanges({ idField: 'id' });
      this.items.subscribe(i=> this.menu = i )
    })
  }
  loadItems(a:string) {
    this.router.navigate(['item/'+a+'/'+this.id], {relativeTo: this.route});
  }
  openGroup(a: number){
    this.isOpen=a;
  }
  onDelete(id){
    this.firestore.collection('catogories').doc(id).delete()
  }

}
