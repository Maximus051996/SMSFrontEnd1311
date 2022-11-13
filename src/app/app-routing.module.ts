import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'error-page-not-found', component: ErrorPageComponent },
  {
    path: 's-ADM',
    loadChildren: () =>
      import('./modules/lazy-modules/s-adm/s-adm.module').then(
        (m) => m.SAdmModule
      ),
  },
  {
    path: 'ADM',
    loadChildren: () =>
      import('./modules/lazy-modules/adm/adm.module').then((m) => m.AdmModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
