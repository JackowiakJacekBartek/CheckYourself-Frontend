import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: LoginService) {
    this.service.Login().subscribe(res => { console.log(res) }, error => {console.log("err")});;
  }

}
