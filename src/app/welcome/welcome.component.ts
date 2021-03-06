import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AuthGuardService } from './../auth-guard.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public auth: AuthService) {}
  
  ngOnInit() {
  }

}
