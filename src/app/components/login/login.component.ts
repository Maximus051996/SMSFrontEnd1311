import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  IsLoader: boolean = false;
  isActive = true;
  innerWidth!: any;
  spinnerType: string = 'ball-clip-rotate-multiple';
  spinnerName: string = 'sp1';
  constructor(
    private requestService: RequestService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.IsLoader = !this.IsLoader;
    this.spinner.show(this.spinnerName);
    setTimeout(() => {
      this.IsLoader = !this.IsLoader;
      this.spinner.hide(this.spinnerName);
    }, 800);
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }
  ngOnDestroy() {
    location.reload();
  }
  showPassword: boolean = false;
  public loginForm: FormGroup;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  onSubmit(value: any) {
    this.IsLoader = !this.IsLoader;
    this.spinner.show(this.spinnerName);
    let data: any = {
      userName: value.userName,
      userPassword: value.userPassword,
    };
    console.log({ data: data });
    this.requestService.login(data).subscribe(
      (res: any) => {
        setTimeout(() => {
          this.IsLoader = !this.IsLoader;
          this.spinner.hide(this.spinnerName);
          if (res.IsSuccess == 'True') {
            localStorage.setItem('token', res.Token);
            this._snackBar.open(`Successfully Logged In !!`, '', {
              duration: 2000,
            });
            location.reload();
          } else {
            this._snackBar.open(`${res.Message} !!`, '', {
              duration: 2000,
            });
          }
        }, 2000);
      },
      (err: any) => {
        this._snackBar.open(`Internal Server Error !!`, '', {
          duration: 2000,
        });
        this.IsLoader = !this.IsLoader;
        this.spinner.hide(this.spinnerName);
      }
    );
  }

  colorChange() {
    return this.loginForm.valid === true ? 'btn-enabled' : 'btn-disabled';
  }
}
