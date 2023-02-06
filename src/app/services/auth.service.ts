import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInSubject = new Subject<boolean>();
  constructor() {}
  baseUrl = environment.backendUrl + '/Users';
  IsLoggerIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getDetailsFromToken(variableValue: any): any {
    if (this.getDecodedAccessToken() != null) {
      if (variableValue == 'User') {
        return this.getDecodedAccessToken().User;
      } else if (variableValue == 'TenantName') {
        let userRole = this.getDecodedAccessToken().Role;
        return userRole == 'SuperAdmin'
          ? 'Administrator Account'
          : this.getDecodedAccessToken().TenantName;
      } else if (variableValue == 'Role') {
        return this.getDecodedAccessToken().Role;
      }
    }
    return null;
  }
  getDecodedAccessToken(): any {
    try {
      let result = JSON.parse(JSON.stringify(jwt_decode(this.getToken()!)));
      return result;
    } catch (Error) {
      return null;
    }
  }
  removeToken() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }
}
