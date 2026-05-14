import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: "app-workshopp-login",
  templateUrl: "./login-workshop.component.html",
  // styleUrls: ["./login-workshop.component.css"],
})

export class LoginWorkshopComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
    
  }
private fb = Inject(FormBuilder);
private auth = Inject(AuthService);
private router = Inject(Router)


from = this.fb.group({
  email: ['', Validators.required, Validators.email],
  senha: ['', Validators.required, Validators.minLength(6)],
})

get email(){
  return this.from.get('email')
}

get senha(){
  return this.from.get('senha')
}




}


