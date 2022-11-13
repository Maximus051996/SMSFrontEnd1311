import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Tenant } from 'src/app/models/tenant';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})
export class TenantsComponent implements OnInit {
  public addeditForm: FormGroup;
  tenantId?: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private _snackBar: MatSnackBar
  ) {
    this.addeditForm = new FormGroup({
      TenantName: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap<any, any>((p: any) => {
          let tenantId = p['TenantId'] || null;
          if (tenantId) {
            this.tenantId = tenantId;
            return this.requestService.getTenantById(tenantId);
          } else return of(new Tenant());
        })
      )
      .subscribe((result: any) => {
        this.addeditForm.patchValue(result.Records);
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addeditForm.controls[controlName].hasError(errorName);
  };

  onSubmit(value: any) {
    let tenant = this.addeditForm.value as Tenant;
    let result: Observable<any>;
    if (this.tenantId) {
      tenant.TenantId = this.tenantId;
      result = this.requestService.updateTenant(tenant);
    } else {
      result = this.requestService.insertTenant(tenant.TenantName);
    }
    result.subscribe((res: any) => {
      this._snackBar.open(`${res.Message} !!`, '', {
        duration: 2 * 1000,
      });
      if (res.IsSuccess == 'True') {
        setTimeout(() => {
          this.router.navigate(['s-ADM/list-tenant']);
        }, 2000);
      }
    });
  }
}
