import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit {

  chatroomIdObs$ !: Observable<any>;
  chatroomId !: string;
  chatroomUsers !: any;

  addUserForm !: FormGroup;
  messageForm !: FormGroup;

  constructor(private route: ActivatedRoute, public appService : AppService, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.chatroomId = this.route.snapshot.paramMap.get('chatroomId')!;
    let chatroomUsersResponse:Promise<any> = firstValueFrom(this.appService.getChatroomUsers(this.chatroomId))
    chatroomUsersResponse.then(data =>{
      this.chatroomUsers = data
      console.log(data)
    })
    this.messageForm = this.fb.group({
      post: this.fb.control<string>('', [Validators.required])
    })
    this.addUserForm = this.fb.group({
      accountHandle : this.fb.control<string>('', [Validators.required]),
    }) 
  }

  addRoomUser() {
    console.log(this.addUserForm.value.accountHandle)
    console.log(this.chatroomId)
    let inviteResponse:Promise<any> = firstValueFrom(this.appService.addRoomUser(
        this.chatroomId, this.addUserForm.value.accountHandle))
    inviteResponse.then(data=>{
      console.log(data)
    })
  }

  submitPost(){
    this.appService.postChat(this.chatroomId, localStorage.getItem('userId')!, this.messageForm.value.post)
  }
}
