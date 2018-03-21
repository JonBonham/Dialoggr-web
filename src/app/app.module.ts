import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService as RoleGuard } from './role-guard.service';
import { EntryService } from './entry.service';
import { FeathersService } from './feathers.service';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatSelectModule, MatFormFieldModule, MatMenuModule, MatListModule, MatInputModule,
         MatSidenavModule, MatToolbarModule, MatIconModule } from "@angular/material";
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { SettingsComponent } from './settings/settings.component';
import { Routes, RouterModule } from "@angular/router";
import { BarchartComponent } from './barchart/barchart.component';
import { HttpModule } from '@angular/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { DateLineChartComponent } from './date-line-chart/date-line-chart.component';

const routes : Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'data', component: DataComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    SettingsComponent,
    BarchartComponent,
    WelcomeComponent,
    DateLineChartComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpModule, MatToolbarModule, MatMenuModule,
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatSelectModule,
    MatInputModule, MatListModule, MatIconModule,
    MatFormFieldModule, MatSidenavModule
  ],
  providers: [AuthService, AuthGuardService, EntryService, FeathersService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor( ) {}

}
