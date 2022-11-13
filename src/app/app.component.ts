import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminnavbarData, SuperAdminnavbarData } from './models/nav-data';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  applicationTitle = 'Stock Management System';
  title = 'SMS';
  isMobile = false;
  userRole!: any;
  userName!: any;
  tenantName!: any;
  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  @ViewChild('sidenav') sidenav: any;
  public loggedInUser!: any;
  navDataPriroty1 = SuperAdminnavbarData;
  navDataPriroty2 = AdminnavbarData;
  IsLoader: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.loggedInUser = this.authService.IsLoggerIn();
    this.userRole = this.authService.getDetailsFromToken('Role');
    this.userName = this.authService.getDetailsFromToken('User');
    this.tenantName = this.authService.getDetailsFromToken('TenantName');
    console.log(this.loggedInUser);
    console.log(this.userRole);
    if (!this.loggedInUser) {
      this.router.navigate(['login']);
    } else {
      if (this.userRole == 'SuperAdmin') {
        this.router.navigate(['s-ADM/dashboard']);
      } else if (this.userRole == 'Admin') {
        this.router.navigate(['ADM/company']);
      }
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.isMobile = window.innerWidth < 500;
  }

  onLogout() {
    this.IsLoader = !this.IsLoader;
    this.spinner.show(this.spinnerName);
    setTimeout(() => {
      this.IsLoader = !this.IsLoader;
      this.spinner.hide(this.spinnerName);
      this.authService.removeToken();
      location.reload();
    }, 1500);
  }
}
