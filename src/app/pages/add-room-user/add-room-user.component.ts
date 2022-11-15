import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-room-user',
  templateUrl: './add-room-user.component.html',
  styleUrls: ['./add-room-user.component.sass']
})
export class AddRoomUserComponent implements OnInit {

  addUserForm !: FormGroup

  constructor(public appService : AppService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      accountHandle : this.fb.control<string>('', [Validators.required]),
    }) 
  }

  addRoomUser() {
  }
}
