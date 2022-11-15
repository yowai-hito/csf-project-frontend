import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {

  public authenticated = false;
  public loginResponse !: Promise<any>

  constructor(private http: HttpClient, private router: Router) { }

  register( userDetails: {username: string, email: string, handle: string,password: string} ) {
    
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    console.log(userDetails)
    return this.http.post(environment.backend + '/spring/user/register', userDetails, { headers:headers })
  }

  authenticate(credentials: { username: string; password: string; }) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.loginResponse = 
      firstValueFrom(this.http.post(environment.backend + '/spring/user/login', credentials, {headers: headers}))

    this.loginResponse.then((data) => {
      if (data.id) {
        console.log(data)
        this.authenticated = true
        localStorage.setItem('userId', data.id)
        localStorage.setItem('userHandle', data.handle)
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        this.router.navigateByUrl("/home")
      }
    })
  }

  getUserDatabases(userId:string | null){
    if (userId === null) {
      return
    } else {
    return firstValueFrom(this.http.get(environment.backend + '/spring/chatroom/user' + '?userId=' + userId))
    }
  }

  changeEmail( details: { userId : string, newEmail : string}) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put(environment.backend + '/spring/user/changeEmail', details, {headers: headers})
  }

  uploadProfilePic( file: File | Blob) {

    const data = new FormData();
    data.set('title',localStorage.getItem('userHandle')!)
    data.set('myfile', file)
    console.log(data)
    return firstValueFrom(
      this.http.post( environment.backend + '/spring/user/uploadProfilePic', data )
    )
  }
}