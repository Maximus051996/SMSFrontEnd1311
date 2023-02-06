import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalDialogComponent } from '../components/dialog/modal-dialog/modal-dialog.component';

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
  downloadUrl = environment.backendUrl + '/Download/';
  constructor(private http: HttpClient, public dialog: MatDialog) {}

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
      }${'UploadExcel'}?fileType=${type}&tenantName=${tenantName}&userName=${userName}`,
      data
    );
  }

  downloadfile(data: any): Observable<HttpResponse<Blob>> {
    return this.http.get<any>(
      `${this.downloadUrl}${'DownloadExcel?'}${this.createHttpParameters(
        data
      ).toString()}`,
      { observe: 'response', responseType: 'blob' as 'json' }
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

  getallactivecompanyListByTenant(data: any) {
    return this.http.get<any>(
      `${this.companyUrl}${'GetAllCompaniesByTenant'}?TenantName=${
        data.TenantName
      }&UserName=${data.UserName}`
    );
  }

  getcompanyByTenant(data: any) {
    return this.http.get<any>(
      `${this.companyUrl}${'GetCompanyByTenant'}?${this.createHttpParameters(
        data
      ).toString()}`
    );
  }

  deletecompanybyTenant(data: any) {
    return this.http.post<any>(
      `${this.companyUrl}${'DeleteCompanyByTenant?'}${this.createHttpParameters(
        data
      ).toString()}`,
      data
    );
  }

  createHttpParameters(params: any) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((p) => {
      if (params[p]) httpParams = httpParams.set(p, params[p]);
    });
    return httpParams;
  }

  openmodalDialog(data: any): void {
    console.log(data.CompanyName);
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: { result: data, module: 'company' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
