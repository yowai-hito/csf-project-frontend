import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  error:boolean = false;
  registerForm !: FormGroup

  constructor(private appService: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [ Validators.required ]),
      email: this.fb.control('', [ Validators.required, Validators.email ]),
      handle: this.fb.control('', [ Validators.required ]),
      password: this.fb.control('', [ Validators.required ]),
      repeatPassword: this.fb.control('', [Validators.required])
    }, {validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { 
    let password = group.controls['password'].value;
    let repeatPassword = group.controls['repeatPassword'].value;

    return password === repeatPassword ? null : { notSame: true }
  }

  register(): void {

    let registerResponse:Promise<any> = firstValueFrom(this.appService.register( {
      username: this.registerForm.value.username, 
      email: this.registerForm.value.email,
      handle: this.registerForm.value.handle,
      password: this.registerForm.value.password}))
    registerResponse.then((data) => {
      if (data) {
        this.router.navigateByUrl('/login')
      } else {
        this.error = true
      }
    })
    
  }
}