import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list-admin-cretion',
  templateUrl: './list-admin-cretion.component.html',
  styleUrls: ['./list-admin-cretion.component.scss'],
})
export class ListAdminCretionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isDataLoad = false;
  filterValue: any;
  IsLoader = false;
  displayedColumns: string[] = [
    'tenantName',
    'userName',
    'isActive',
    'actions',
  ];

  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    private requestService: RequestService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnDestroy() {
    console.clear();
  }
  ngAfterViewInit() {
    this.getTenantUser();
  }
  ngOnInit() {
    console.clear();
  }
  applyFilter() {
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  getTenantUser() {
    this.IsLoader = true;
    this.spinner.show(this.spinnerName);
    this.requestService.getUserDetailsByTenant().subscribe(
      (res: any) => {
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(res.Records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.IsLoader = false;
          this.spinner.hide(this.spinnerName);
        }, 2000);
      },
      (err) => {
        this.IsLoader = false;
        this.isDataLoad = !this.isDataLoad;
        this.spinner.hide(this.spinnerName);
      }
    );
  }

  enabledisableUser(userId: any, event: any) {
    let data: any = {
      UserId: userId,
      isActive: event,
    };
    this.requestService.enabledisableUser(data).subscribe((op: any) => {
      if (op.IsSuccess == 'True') {
        this.dataSource.data = [];
        this.getTenantUser();
        this.filterValue = '';
      }
    });

    this.dataSource.data = [];
    this.getTenantUser();
    this.filterValue = '';
  }
}
