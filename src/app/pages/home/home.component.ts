import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  userChatrooms !: Promise<any> | undefined
  chatroomData !: any
  createRoom !: FormGroup;

  constructor(public appService: AppService, private router: Router, private fb: FormBuilder) { }
  

  ngOnInit(): void {
    this.userChatrooms = this.appService.getUserDatabases(localStorage.getItem('userId'));
    if (this.userChatrooms !== undefined) { 
      this.userChatrooms.then(data => {
        this.chatroomData = data
      })
    this.createRoom = this.fb.group({
      chatroomName: this.fb.control<string>('', [Validators.required]),
    })

    }
  }
  ngOnDestroy(): void {
  }

  enterChatroom(chatroomId: string){
    this.router.navigateByUrl('/chatroom/' + chatroomId)
  }
  
  createChatroom(){
    let createResponse:Promise<any> = firstValueFrom(this.appService.createChatroom(this.createRoom.value.chatroomName))
    createResponse.then((data)=> {
      console.log(data)
    })
  }
}
