import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../sharedService/shared-service.service';
import {Observable} from 'rxjs';
import {Token} from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private apiUrl = this.sharedService.getApiUrl('tokens');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  public createToken(data): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, data);
  }

}
