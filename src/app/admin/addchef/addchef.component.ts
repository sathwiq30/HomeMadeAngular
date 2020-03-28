import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addchef',
  templateUrl: './addchef.component.html',
  styleUrls: ['./addchef.component.css']
})
export class AddchefComponent implements OnInit {

  isLoading = false;
  r;
  constructor(private http: HttpClient) {}
  hide = true;
  ngOnInit() {
  }

  async onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    await this.http.post('https://us-central1-homemade-45afb.cloudfunctions.net/app/chef/',
    {email :form.value.email, password :  form.value.password}
    )
    .subscribe(
      (msg) => {
        console.log(msg)
      },
    error=> {
      console.log(error)
    })
    this.isLoading = false
  }
}
