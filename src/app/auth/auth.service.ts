import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  AuthData
} from './auth-data.model';
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
  // private tokenTimer: any;
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject < boolean > ();
  private message: string;
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  async createUser(email: string, password: string) {

    var error = await this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then(()=> this.router.navigate(['/']) )
      .catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.log(errorMessage)
        return errorMessage
      });
      this.router.navigate(['/signup/'+error]);
  }
  async login(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    
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
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    // clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }
}
