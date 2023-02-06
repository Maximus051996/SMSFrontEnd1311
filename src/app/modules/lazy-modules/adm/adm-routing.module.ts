import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from 'src/app/components/company/company.component';
import { ProductComponent } from 'src/app/components/product/product.component';
import { SpvInfoComponent } from 'src/app/components/spv-info/spv-info.component';
import { StockInfoComponent } from 'src/app/components/stock-info/stock-info.component';

const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'product', component: ProductComponent },
  { path: 'spv-info', component: SpvInfoComponent },
  { path: 'stock-info', component: StockInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmRoutingModule {}
