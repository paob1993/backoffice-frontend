import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient;
  private url = environment.baseUrl + '/auth';

  constructor(
    private handler: HttpBackend,
  ) {
    this.httpClient = new HttpClient(this.handler);
  }

  login(loginData: { email: string, password: string }) {
    return this.httpClient.post(this.url, (loginData))
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  tokenVerify() {
    const token = JSON.parse(localStorage.getItem('token') || '');
    return this.httpClient.get(`${this.url}/token-verify?token=${token}`)
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  isAuthenticated() {
    return this.tokenVerify().subscribe({
      next: (response: any) => {
        return response.expired;
      }
    });
  }

  handleError(error: Response | any) {
    return throwError(error?.error);
  }

}
