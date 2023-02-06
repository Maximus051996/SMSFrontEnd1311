import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-admin-creation',
  templateUrl: './admin-creation.component.html',
  styleUrls: ['./admin-creation.component.scss'],
})
export class AdminCreationComponent implements OnInit {
  public addeditForm: FormGroup;
  tenantList: any = [];
  userId: any;
  constructor(
    private requestService: RequestService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getTenantData();
    this.addeditForm = new FormGroup({
      TenantId: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap<any, any>((p: any) => {
          let userId = p['UserId'] || null;
          if (userId) {
            this.userId = userId;
            return this.requestService.getUserById(userId);
          } else return of(new User());
        })
      )
      .subscribe((result: any) => {
        this.addeditForm.patchValue(result.Records);
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addeditForm.controls[controlName].hasError(errorName);
  };

  getTenantData() {
    this.requestService.getTenants().subscribe(
      (res) => {
        this.tenantList = res.Records;
        //this.isLoader = !this.isLoader;
      },
      (err) => {
        //this.isDataLoad = !this.isDataLoad;
      }
    );
  }
  onSubmit(value: any) {
    let userObj = {
      UserId: this.userId,
      UserName: value.Email.split('@')[0],
      TenantId: value.TenantId,
      RoleName: 'Admin',
      UserPassword: value.Email.split('@')[0] + '@54321',
      Email: value.Email,
      Operation: this.userId > 0 ? 'Update' : 'Insert',
    };
    this.requestService.insertupdateUser(userObj).subscribe(
      (res: any) => {
        this._snackBar.open(`${res.Message} !!`, '', {
          duration: 2 * 1000,
        });
        if (res.IsSuccess == 'True') {
          this.router.navigate(['s-ADM/list-adm-crt']);
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 500) {
          this._snackBar.open(
            'UserName Already Exist or Internal Server Error !!!',
            '',
            {
              duration: 2 * 1000,
            }
          );
        }
      }
    );
    console.log(userObj);
  }
}
