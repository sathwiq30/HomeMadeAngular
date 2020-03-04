import { Component, OnInit  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit  {
  isLoading = false;
  co;  hide = true;
  error
  constructor(public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router
    ) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.id){
        
        this.error= params.id
      }
    //  this.co = params.i;
    //  console.log(this.co);
    });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}

