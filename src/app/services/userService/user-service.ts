import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../sharedService/shared-service.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = this.sharedService.getApiUrl('users');

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

}
