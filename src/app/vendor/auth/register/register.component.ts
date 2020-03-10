import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  r;
  constructor(public authService: AuthService, private router: ActivatedRoute,private route: Router,private auth : AngularFireAuth,
    private firestore : AngularFirestore) {}
  hide = true;
  ngOnInit() {
    this.router.params.subscribe(params => {
      if(params.id === 'true')
        console.log('fuck')
      else if (params.id ){
        this.r = params.id
        this.isLoading = false;
      }
      // this.r = params.id;
      // console.log(this.r);
      // if(this.r=='w'){
      // 
      // }
      
  });
  }

  async onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    await this.auth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(i=> console.log(i))
      .catch(err=> this.r= err.message)
    if(this.auth.auth.currentUser.uid){
      await this.firestore.collection('customClaims').add({uid : this.auth.auth.currentUser.uid, email: this.auth.auth.currentUser.email})
      this.route.navigateByUrl('')
    }
       this.isLoading = false
  }

}