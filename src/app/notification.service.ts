import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private http = inject(HttpClient);
  sendNotification(payload: any): Observable<any> {
    const url = `http://127.0.0.1:8000/test/${payload}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' +
        'ya29.a0AXeO80R4oed33yJ6NNyK8dhgwSxkiYJJXUtQoWj0cgehvTaeScH-iWW5N1-jvQWNcov_fcfdiIDEkEITfK7Xzpk0BhHVrHNP7w5ZWBU4PaA23h0u7rL3OtjXB7eRo58IIilU6atbUxbjc_c0Mjw5zk_JXP5H00ZmAdH1LyX-5I9AnxURuzzZnXEeHQzZAFYQtnwl1ayLBoPQcpV-gZns0-omWVGrA8EPcx8A38J4fq0f0rJm4fmxS9q337u2RRiwJ_-Y2rV-ToFA8alU8JlkjWQsy1R8FYsiXgWCzTNs5cYdVPMeZU3GaeD1WFJ-Fz5eViZNJmg8bMf_Tct8suTZqqekrPh-dZV0q375PxZw6ldPsvyISIeirZI2Mw4DfY9TtBWyo-ULAbj9mPu3t6bYDiDlliFwt05yAioaCgYKAUQSAQ4SFQHGX2MiQFRH5mu0CRDcL6YuQYMf1A0426',
    });
    return this.http.post(url, { headers });
  }
}
