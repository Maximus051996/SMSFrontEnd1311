import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/components/company/company.component';
import { ProductComponent } from 'src/app/components/product/product.component';

const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'product', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRoutingModule {}
