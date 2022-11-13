import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SAdmRoutingModule } from './s-adm-routing.module';
import { SAdmComponent } from './s-adm.component';


@NgModule({
  declarations: [
    SAdmComponent
  ],
  imports: [
    CommonModule,
    SAdmRoutingModule
  ]
})
export class SAdmModule { }
