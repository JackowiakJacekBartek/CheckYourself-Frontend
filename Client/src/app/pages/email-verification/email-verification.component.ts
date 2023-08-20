import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from './email.verification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  urlParams: EmailVerification = {
    email: '',
    code: 0
  }

  constructor(private route: ActivatedRoute, private emailVerificationService: EmailVerificationService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['code'])
    console.log(this.route.snapshot.params['email'])
    this.urlParams.code = Number(this.route.snapshot.params['code']);
    this.urlParams.email = this.route.snapshot.params['email'];
    
      console.log(this.urlParams)
      this.emailVerificationService.verifyEmail(this.urlParams).subscribe(res => console.log(res))
  

  }


}

export interface EmailVerification {
  email: string,
  code: number
}