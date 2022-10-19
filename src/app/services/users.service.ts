import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient: HttpClient;
  private url = environment.baseUrl + '/users';

  constructor(
    private handler: HttpBackend,
  ) {
    this.httpClient = new HttpClient(this.handler);
  }

  addUser(user: User) {
    return this.httpClient.post(this.url, (user))
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  handleError(error: Response | any) {
    return throwError(error?.error);
  }

}
