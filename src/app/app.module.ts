import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from './modules/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { TenantsComponent } from './components/tenants/tenants.component';
import { ListTenantComponent } from './components/tenants/list-tenant/list-tenant.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AdminCreationComponent } from './components/admin-creation/admin-creation.component';
import { ListAdminCretionComponent } from './components/admin-creation/list-admin-cretion/list-admin-cretion.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompanyComponent } from './components/company/company.component';
import { ProductComponent } from './components/product/product.component';
import { SpvInfoComponent } from './components/spv-info/spv-info.component';
import { StockInfoComponent } from './components/stock-info/stock-info.component';
import { ModalDialogComponent } from './components/dialog/modal-dialog/modal-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TenantsComponent,
    ListTenantComponent,
    ErrorPageComponent,
    AdminCreationComponent,
    ListAdminCretionComponent,
    CompanyComponent,
    ProductComponent,
    SpvInfoComponent,
    StockInfoComponent,
    ModalDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
