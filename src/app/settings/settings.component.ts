import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AuthGuardService } from './../auth-guard.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
