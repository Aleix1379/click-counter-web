import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Counter} from '../../interfaces/counter';
import {Observable} from 'rxjs';
import {SharedService} from '../sharedService/shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private apiUrl = this.sharedService.getApiUrl('counter');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  public getCounter(): Observable<Counter> {
    return this.http.get<Counter>(`${this.apiUrl}`);
  }

  public increaseCounter(): Observable<Counter> {
    return this.http.put<Counter>(this.apiUrl, {});
  }

}
