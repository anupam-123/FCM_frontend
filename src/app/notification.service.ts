import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  sendNotification(payload: any): Observable<any> {
    const url = `http://127.0.0.1:8000/test/${payload}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + `${environment.firebaseConfig.apiKey}`,
    });
    return this.http.post(url, { headers });
  }
}
