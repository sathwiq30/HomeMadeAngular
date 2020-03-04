import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  r;
  constructor(public authService: AuthService, private router: ActivatedRoute,private route: Router) {}
  hide = true;
  ngOnInit() {
    this.router.params.subscribe(params => {
      if(params.id === 'true')
        this.route.navigate(['/']);
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

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.createUser(form.value.email, form.value.password);
    
  }

}
