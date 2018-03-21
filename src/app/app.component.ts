import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public auth: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    auth.handleAuthentication();
  }
  
}
