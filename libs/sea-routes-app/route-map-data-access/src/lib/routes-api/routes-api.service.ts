import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root',
     
})
export class RoutesApiService {
     constructor(private http: HttpClient) {}

     requestRoutesInfo(): Observable<string> {
          return this.http.get('assets/sea-routes/web_challenge.csv', {
               responseType: 'text',
          });
     }
}
