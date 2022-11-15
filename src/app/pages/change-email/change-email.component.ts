import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.sass']
})
export class ChangeEmailComponent implements OnInit {

  emailForm !: FormGroup;
  error : boolean = false;
  currentEmail : any = localStorage.getItem('email')

  constructor(private appService: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      newEmail: this.fb.control('', [ Validators.required ]),
      confirmNewEmail: this.fb.control('', [Validators.required])
    }, {validator: this.checkEmails })
  }

  checkEmails(group: FormGroup) { 
    let newEmail = group.controls['newEmail'].value;
    let confirmNewEmail = group.controls['confirmNewEmail'].value;

    return newEmail === confirmNewEmail ? null : { notSame: true }
  }

  changeEmail(): void {

    let emailResponse:Promise<any> = firstValueFrom(this.appService.changeEmail( {
      userId : localStorage.getItem('userId')!,
      newEmail: this.emailForm.value.newEmail
    }))
    emailResponse.then((data) => {
      if (data) {
        localStorage.setItem('email', this.emailForm.value.newEmail)
        this.router.navigateByUrl('/profile')
      } else {
        this.error = true
      }
    })
    
  }

}
