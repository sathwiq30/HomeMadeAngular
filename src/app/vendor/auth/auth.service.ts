import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';


import {
  Subject
} from 'rxjs';
import {
  Router
} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router, private db : AngularFirestore,private auth : AngularFireAuth) {}
  async createUser(email: string, password: string) {

    var error = await this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(i=> {
        
      } )
      .catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.log(errorMessage)
        return errorMessage
      });
      if(error == true){
        this.sendForCustomRules()
      }
      console.log(error)
      this.router.navigate(['/signup/'+error]);
  }
  async login(email: string, password: string) {
    
    var error = await this.auth.auth.signInWithEmailAndPassword(email,password)

    .catch((error) =>{
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.log(errorMessage)
      return errorMessage
    });

      
    this.router.navigate(['/login/'+error]);

  }
  sendForCustomRules(){
    console.log(this.auth.idToken)
  }

}
