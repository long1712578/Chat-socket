import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DotnetServiceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
  };
  private REST_API_SERVER = environment.basicURL;
  constructor(private httpClient: HttpClient) { }

  public GetMessages(): Observable<any> {
    const url = `${this.REST_API_SERVER}/message`;
    return this.httpClient.get<any>(url, this.httpOptions)
      .pipe();
  }
  public SendMessage(data:any): Observable<any> {
    const url = `${this.REST_API_SERVER}/message`;
    return this.httpClient.post<any>(url,data ? data : {});
  }
}
