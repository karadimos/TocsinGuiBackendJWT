import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { LoginFormComponent } from './components/login-form/login-form.component';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HeaderComponent } from './components/header/header.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { HomeComponent } from './components/home/home.component';
import { NetworkInterceptor } from './services/network.interceptor';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { MarkerService } from './services/marker.service';
import { WarnstufenComponent } from './components/reports/warnstufen/warnstufen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapsComponent } from './components/maps/maps.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EmergenciesComponent } from './components/emergency/emergencies/emergencies.component';
import { EmergencydetailsComponent } from './components/emergency/emergencydetails/emergencydetails.component';
import { MowasComponent } from './components/mowas/mowas/mowas.component';
import { MowasdetailsComponent } from './components/mowas/mowasdetails/mowasdetails.component';
import { MainComponent } from './components/reports/main/main.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginFormComponent,
    SidenavComponent,
    ClusterComponent,
    WarnstufenComponent,
    DashboardComponent,
    //SignupComponent,
    MapsComponent,
    PortfolioComponent,
    EmergenciesComponent,
    EmergencydetailsComponent, MowasComponent, MowasdetailsComponent, MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //NoopAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    //Ng2SearchPipeModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, MarkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
