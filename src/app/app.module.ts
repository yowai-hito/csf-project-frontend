import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppService } from './services/app.service';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangeEmailComponent } from './pages/change-email/change-email.component';
import { UploadProfilePicComponent } from './pages/upload-profile-pic/upload-profile-pic.component';
import { AddRoomUserComponent } from './pages/add-room-user/add-room-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ChatroomComponent,
    RegisterComponent,
    ProfileComponent,
    ChangeEmailComponent,
    UploadProfilePicComponent,
    AddRoomUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
