import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  name !: String;
  handle !: String;
  email !: String;


  ngOnInit(): void {
    this.name = localStorage.getItem('username')!
    this.handle = localStorage.getItem('userHandle')!
    this.email = localStorage.getItem('email')!
  }

  changeEmail(){
    this.router.navigateByUrl('/emailChange')
  }

  uploadImage(){
    this.router.navigateByUrl('/uploadProfilePic')
  }
}
