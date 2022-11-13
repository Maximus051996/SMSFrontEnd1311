import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
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
    private _snackBar: MatSnackBar
  ) {
    this.addeditlistForm = new FormGroup({
      CompanyName: new FormControl('', [Validators.required]),
      Priroty: new FormControl('', [Validators.required]),
    });
  }
  currentFile: any;
  IsValid = false;

  ngOnInit(): void {}

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
}
