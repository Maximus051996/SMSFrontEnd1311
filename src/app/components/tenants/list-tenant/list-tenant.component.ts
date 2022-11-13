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
  selector: 'app-list-tenant',
  templateUrl: './list-tenant.component.html',
  styleUrls: ['./list-tenant.component.scss'],
})
export class ListTenantComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['tenantName', 'statusLabel', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  filterValue!: string;
  IsLoader!: boolean;
  isDataLoad = false;
  constructor(
    private requestService: RequestService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnDestroy() {
    console.clear();
  }
  ngAfterViewInit() {
    this.getTenantData();
  }

  ngOnInit() {
    console.clear();
  }

  applyFilter() {
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  enabledisableTenant(tenantId: any, tenantName: any, event: any) {
    let data: any = {
      tenantId: tenantId,
      isActive: event,
    };
    this.requestService.enabledisableTenant(data).subscribe((op: any) => {
      if (op.IsSuccess == 'True') {
        this.dataSource.data = [];
        this.getTenantData();
        this.filterValue = '';
      }
    });

    this.dataSource.data = [];
    this.getTenantData();
    this.filterValue = '';
  }

  getTenantData() {
    this.IsLoader = true;
    this.spinner.show(this.spinnerName);
    this.requestService.getTenants().subscribe(
      (res) => {
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(res.Records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.IsLoader = false;
          this.spinner.hide(this.spinnerName);
        }, 2000);
      },
      (err) => {
        this.isDataLoad = !this.isDataLoad;
        this.IsLoader = false;
        this.spinner.hide(this.spinnerName);
      }
    );
  }
}
