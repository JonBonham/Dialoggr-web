import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';
import { Observable } from 'rxjs/Observable';

export interface EntryData {
  total: number;
  limit: number;
  skip: number;
  data: Entry[];
}

export interface Entry {
  user: string;
  type: string;
  value: number;
  start: Date;
  end: Date;
  description: string;
}

@Injectable()
export class EntryService {

  constructor(
    private feathers: FeathersService
  ) {}

  getEntries(query: any = {}): Observable<EntryData> {
    return this.feathers.service('entries').watch()
               .find({
                 query: query
               });
  }

}
