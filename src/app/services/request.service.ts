import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  loginUrl = environment.backendUrl + '/Login';
  dashboardUrl = environment.backendUrl + '/Dashboard/';
  tenantUrl = environment.backendUrl + '/Tenants/';
  userUrl = environment.backendUrl + '/Users/';
  uploadUrl = environment.backendUrl + '/Upload/';
  companyUrl = environment.backendUrl + '/Company/';
  constructor(private http: HttpClient) {}

  login(data: any): any {
    return this.http.post<any>(this.loginUrl, data);
  }
  getAdminDashboardDetails() {
    return this.http.get<any>(
      `${this.dashboardUrl}${'GetAdminDashboardDetails'}`
    );
  }

  insertTenant(data: any): any {
    return this.http.post<any>(
      `${this.tenantUrl}${'InsertTenant'}?tenantName=${data}`,
      data
    );
  }

  updateTenant(data: any): any {
    return this.http.post<any>(`${this.tenantUrl}${'UpdateTenant'}`, data);
  }

  getTenants() {
    return this.http.get<any>(`${this.tenantUrl}${'GetTenants'}`);
  }

  enabledisableTenant(data: any) {
    return this.http.post(`${this.tenantUrl}${'EnableDisableTenant'}`, data);
  }

  getTenantById(tenantId: any) {
    return this.http.get<any>(
      `${this.tenantUrl}${'GetTenantById'}?tenantId=${tenantId}`
    );
  }
  insertupdateUser(data: any) {
    return this.http.post(`${this.userUrl}${'InsertUpdateUser'}`, data);
  }
  getUserDetailsByTenant() {
    return this.http.get<any>(`${this.userUrl}${'UserDetailsByTenant'}`);
  }

  getUserById(userId: any) {
    return this.http.get<any>(
      `${this.userUrl}${'GetUserById'}?UserId=${userId}`
    );
  }
  enabledisableUser(data: any) {
    return this.http.post(`${this.userUrl}${'EnableDisableUser'}`, data);
  }
  uploadFiles(data: any, type: any, userName: any, tenantName: any) {
    return this.http.post(
      `${
        this.uploadUrl
      }${'Upload'}?fileType=${type}&tenantName=${tenantName}&userName=${userName}`,
      data
    );
  }

  insertCompany(data: any): any {
    return this.http.post<any>(
      `${this.companyUrl}${'InsertCompany'}?CompanyName=${
        data.CompanyName
      }&TenantName=${data.TenantName}&UserName=${data.UserName}&Priroty=${
        data.Priroty
      }`,
      data
    );
  }
}
