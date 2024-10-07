import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { ClusterComponent } from './components/cluster/cluster.component';
import { MapsComponent } from './components/maps/maps.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { MowasComponent } from './components/mowas/mowas/mowas.component';
import { EmergenciesComponent } from './components/emergency/emergencies/emergencies.component';
import { MainComponent } from './components/reports/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cluster', component: ClusterComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'mowas', component: MowasComponent },
  { path: 'emergencies', component: EmergenciesComponent },
  { path: 'reports', component: MainComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    data: {
      role: [
        'ROLE_ADMIN',
        'ROLE_EDIT'
      ]
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
