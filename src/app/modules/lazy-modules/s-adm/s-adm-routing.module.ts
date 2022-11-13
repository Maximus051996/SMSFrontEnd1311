import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreationComponent } from 'src/app/components/admin-creation/admin-creation.component';
import { ListAdminCretionComponent } from 'src/app/components/admin-creation/list-admin-cretion/list-admin-cretion.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ListTenantComponent } from 'src/app/components/tenants/list-tenant/list-tenant.component';
import { TenantsComponent } from 'src/app/components/tenants/tenants.component';

const routes: Routes = [
  { path: 'list-tenant', component: ListTenantComponent },
  { path: 'tenant', component: TenantsComponent },
  { path: 'tenant/:TenantId', component: TenantsComponent },
  { path: 'adm-crt', component: AdminCreationComponent },
  { path: 'adm-crt/:UserId', component: AdminCreationComponent },
  { path: 'list-adm-crt', component: ListAdminCretionComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SAdmRoutingModule {}
