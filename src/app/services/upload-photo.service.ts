import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {
  Url
  constructor(private storage: AngularFireStorage) { }
  async uploadFile(uid,file) {
    console.log(file)
    console.log(file.type)
    const filePath = uid+'/'+file.name;
    await this.storage.upload(filePath, file).
        then(
          async (a)=>{
            await a.ref.getDownloadURL().then(

              a => {
                this.Url = a
                console.log(this.Url)
              }
            )
          }
        )
  return this.Url
    // const ref = this.storage.ref('users/davideast.jpg');
    // this.Url = ref.getDownloadURL();
    // console.log(this.Url)
  }

}
