import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['companyName', 'priroty', 'actions'];
  filterValue!: string;
  dataSource!: MatTableDataSource<any>;
  isDataLoad = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  isExcelUpload: boolean = true;
  public addeditlistForm: FormGroup;
  selectedIndex: number = 0;
  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  prirotyList = [{ value: 'High' }, { value: 'Low' }, { value: 'Medium' }];
  IsLoader = false;
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.addeditlistForm = new FormGroup({
      CompanyName: new FormControl('', [Validators.required]),
      Priroty: new FormControl('', [Validators.required]),
    });
  }
  currentFile: any;
  IsValid = false;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getCompanyData();
  }

  handleFileInput(e: any) {
    this.currentFile = e.target.files[0];
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addeditlistForm.controls[controlName].hasError(errorName);
  };
  navInitialTab() {
    this.selectedIndex = 0;
  }

  onSubmit() {
    let data = {
      CompanyName: this.addeditlistForm.value.CompanyName,
      TenantName: this.authService.getDetailsFromToken('TenantName'),
      UserName: this.authService.getDetailsFromToken('User'),
      Priroty: this.addeditlistForm.value.Priroty,
    };
    console.log(data);
    if (data != null) {
      this.IsLoader = !this.IsLoader;
      this.spinner.show(this.spinnerName);
      this.requestService.insertCompany(data).subscribe((res: any) => {
        this._snackBar.open(`${res.Message} !!`, '', {
          duration: 2 * 1000,
        });
        if (res.IsSuccess == 'True') {
          setTimeout(() => {
            this.IsLoader = !this.IsLoader;
            this.spinner.hide(this.spinnerName);
            this.navInitialTab();
            this.getCompanyData();
            this.addeditlistForm.reset();
          }, 2000);
        }
      });
    }
  }

  uploadFile() {
    if (this.currentFile != undefined) {
      this.IsValid = false;
      this.IsLoader = !this.IsLoader;
      this.spinner.show(this.spinnerName);
      setTimeout(() => {
        this.IsLoader = !this.IsLoader;
        this.spinner.hide(this.spinnerName);
        const formData = new FormData();
        formData.append('file', this.currentFile);
        this.requestService
          .uploadFiles(
            formData,
            'Company',
            this.authService.getDetailsFromToken('User'),
            this.authService.getDetailsFromToken('TenantName')
          )
          .subscribe((res: any) => {
            if (res) {
              this._snackBar.open(`${res.Message} !!`, '', {
                duration: 2000,
              });
            }
          });
      }, 800);
    } else {
      this.IsValid = true;
    }
  }

  getCompanyData() {
    this.IsLoader = true;
    this.spinner.show(this.spinnerName);
    let data = {
      TenantName: this.authService.getDetailsFromToken('TenantName'),
      UserName: this.authService.getDetailsFromToken('User'),
    };
    this.requestService.getallactivecompanyListByTenant(data).subscribe(
      (res) => {
        if (res.IsSuccess) {
          this.dataSource = new MatTableDataSource(res.Records);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.IsLoader = false;
          this.spinner.hide(this.spinnerName);
        }
      },
      (err) => {
        this._snackBar.open(`Internal Server Error !!`, '', {
          duration: 2000,
        });
        this.isDataLoad = !this.isDataLoad;
        this.IsLoader = false;
        this.spinner.hide(this.spinnerName);
      }
    );
  }

  deleteCompany(id: any) {
    let data = {
      TenantName: this.authService.getDetailsFromToken('TenantName'),
      UserName: this.authService.getDetailsFromToken('User'),
      CompanyId: id,
    };
    this.requestService.deletecompanybyTenant(data).subscribe((res) => {
      if (res.IsSuccess) {
        this._snackBar.open(`${res.Message} !!`, '', {
          duration: 2000,
        });
        this.getCompanyData();
      }
    });
  }

  viewCompany(id: any) {
    this.IsLoader = true;
    this.spinner.show(this.spinnerName);
    let data = {
      TenantName: this.authService.getDetailsFromToken('TenantName'),
      UserName: this.authService.getDetailsFromToken('User'),
      CompanyId: id,
    };
    this.requestService.getcompanyByTenant(data).subscribe((res) => {
      if (res.IsSuccess) {
        this.IsLoader = false;
        this.spinner.hide(this.spinnerName);
        this.requestService.openmodalDialog(res.Records);
      }
    });
  }

  applyFilter() {
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  dowloadExcel() {
    this.IsLoader = true;
    this.spinner.show(this.spinnerName);
    let data = {
      fileType: 'Company',
      tenantName: this.authService.getDetailsFromToken('TenantName'),
      userName: this.authService.getDetailsFromToken('User'),
    };
    this.requestService.downloadfile(data).subscribe((res: any) => {
      var file = new Blob([res.body], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      var contentDisposition = res.headers.get('content-disposition');

      var filename = contentDisposition
        .split(';')[1]
        .split('filename')[1]
        .split('=')[1]
        .trim();

      saveAs(file, filename);

      this.IsLoader = false;
      this.spinner.hide(this.spinnerName);
    });
  }
}
