import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-upload-profile-pic',
  templateUrl: './upload-profile-pic.component.html',
  styleUrls: ['./upload-profile-pic.component.sass']
})
export class UploadProfilePicComponent implements OnInit {

  file !: File;

  @ViewChild('toUpload')
  toUpload!: ElementRef

  onChange(event:any) {
    this.file = event.target.files[0];
}
  constructor(private fb: FormBuilder, public appService: AppService) { }

  ngOnInit(): void {
  }

  onUpload() {
    let uploadResponse:Promise<any> =this.appService.uploadProfilePic(this.file)
    uploadResponse.then(data => {
      console.log(data)
    })
  }
}
