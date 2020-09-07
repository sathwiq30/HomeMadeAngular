import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chefcategory',
  templateUrl: './chefcategory.component.html',
  styleUrls: ['./chefcategory.component.css']
})
export class ChefcategoryComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private route : ActivatedRoute) { }
  text = ''
  ngOnInit() {
  }
  id
  onSubmit(){
    this.route.params.subscribe(params => {
      console.log(params.id)
      this.id = params.id
      this.firestore.collection('catogories').add({ 'name' : this.text, 'uid' :  this.id })
      this.text=''
    })
  }

}
