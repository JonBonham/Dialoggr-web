import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { AuthGuardService } from './../auth-guard.service';
import { EntryData, Entry, EntryService } from '../entry.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  private entryData: Entry[];

  constructor(public auth: AuthService, public entryService: EntryService) {
    let query = {
      user: auth.userProfile.sub
    };
    entryService.getEntries(query).subscribe(
      (ed: EntryData) => {
        this.entryData = ed.data;
      }
    );
  }

}
