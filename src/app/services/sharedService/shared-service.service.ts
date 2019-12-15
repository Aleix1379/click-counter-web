import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly serverUrl = environment.serverUrl;

  constructor() {
  }

  public getApiUrl(path: string) {
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    return `${this.serverUrl}/api/v1${path}`;
  }

}
