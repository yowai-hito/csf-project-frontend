import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public appService: AppService, private router: Router) { }
  userChatrooms !: Promise<any> | undefined
  chatroomData !: any

  ngOnInit(): void {
    this.userChatrooms = this.appService.getUserDatabases(localStorage.getItem('userId'));
    if (this.userChatrooms !== undefined) { 
      this.userChatrooms.then(data => {
        this.chatroomData = data
      })
    }
  }
  ngOnDestroy(): void {
  }

  enterChatroom(chatroomId: string){
    this.router.navigateByUrl('/chatroom/' + chatroomId)
  }
}
