import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  activeTenants: any = [];
  chartOptions = {};
  barOptions = {};
  roles: any = [];
  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  totalUserByTenant: any = [];
  totalRoleByTenant: any = [];
  isLoader = false;
  isValid: boolean = false;
  isDataLoad = false;
  displayedColumns: string[] = ['slno', 'roleName'];
  dataSource!: MatTableDataSource<any>;
  IsLoader: boolean = false;

  constructor(
    private requestService: RequestService,
    private spinner: NgxSpinnerService
  ) {
    this.getAllActiveTenantsDetails();
    this.chartDetails();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.requestService.getAdminDashboardDetails().subscribe((res) => {
        if (res.IsSuccess) {
          this.dataSource = new MatTableDataSource(res.AllActiveRoles);
        }
      });
    }, 800);
  }

  getAllActiveTenantsDetails() {
    this.requestService.getAdminDashboardDetails().subscribe(
      (res) => {
        if (res.IsSuccess) {
          res.TenantResult.forEach((element: any) => {
            this.activeTenants.push(element.TenantName);
          });

          res.RoleCountByTenantResult.forEach((element: any) => {
            this.totalRoleByTenant.push({
              name: element.RoleName,
              data: element.RoleCount,
            });
          });

          res.UserByTenantResult.forEach((element: any) => {
            this.totalUserByTenant.push({
              name: element.TenantName,
              colorByPoint: true,
              y: element.TenantCount,
            });
          });
          this.isValid = !this.isValid;
        }
      },
      (err) => {
        this.isDataLoad = !this.isDataLoad;
      }
    );
  }

  chartDetails() {
    this.IsLoader = !this.IsLoader;
    this.spinner.show(this.spinnerName);
    this.chartOptions = {
      title: {
        text: 'Total Workers Per Active Tenants',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:#5EBEC4">{point.name}</span>: <b>{point.y}<br/>',
      },
      series: [
        {
          type: 'pie',
          name: 'Total Worker',
          data: this.totalUserByTenant,
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      ],
    };
    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event('reSize'));
      this.IsLoader = !this.IsLoader;
      this.spinner.show(this.spinnerName);
    }, 1000);

    this.barOptions = {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      title: {
        text: 'Total Workers Roles Count By Tenants',
      },
      xAxis: {
        categories: this.activeTenants,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} Persons</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: this.totalRoleByTenant,
    };
  }
}
