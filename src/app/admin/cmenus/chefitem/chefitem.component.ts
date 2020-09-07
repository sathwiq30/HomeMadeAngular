import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadPhotoService } from 'src/app/services/upload-photo.service';

@Component({
  selector: 'app-chefitem',
  templateUrl: './chefitem.component.html',
  styleUrls: ['./chefitem.component.css']
})
export class ChefitemComponent implements OnInit {
  constructor(private route: ActivatedRoute,private firestore: AngularFirestore,private auth : AngularFireAuth,
    private storage : UploadPhotoService
    ) { }
  id
  items: Observable<any[]>;
  item 
  text = ''
  price = ''
  uid 
  ngOnInit() {
    this.route.params.subscribe(params => {
     this.id =  params.i
     this.uid = params.id
     console.log(this.id)
     console.log(params.id)
     this.items = this.firestore.collection('menu',ref => ref.where('cid', '==', this.id)).valueChanges({ idField: 'id' });
     this.items.subscribe(i=> this.item = i )
    });
  }
  async onSubmit(){
    const url = await this.storage.uploadFile( this.auth.auth.currentUser.uid, this.photos[0] )
    this.firestore.collection('menu').add({ 'name' : this.text,price : this.price, 'cid' :  this.id ,'chefId' : this.uid , available : true, image : url})
    this.price = ''
    this.text = ''
    this.images= []
    this.photos = []
    this.previewUrl = false
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
    this.firestore.collection('menu').doc(this.itemId).update({ 'name' : this.editText,price : this.editPrice, 'cid' :  this.i.cid,'chefId': this.uid })
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

  imagePreview = ''
  previewUrl  : boolean = false
  images = [] 
  photos = []
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    console.log(this.photos)
    var reader = new FileReader();      
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.photos.push(file)
      this.images.push( reader.result); 
      this.previewUrl = true
      // console.log(reader.result)
    }
  }
  onRemove(i){
    this.photos.splice(i,1)
    this.images.splice(i,1)
    console.log(i)
    console.log(this.images) 
    if(this.images.length==0)
      this.previewUrl = false
  }


}
