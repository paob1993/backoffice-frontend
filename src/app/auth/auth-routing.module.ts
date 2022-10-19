import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullPageLayoutComponent } from '../shared/layouts/full-page-layout/full-page-layout.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [{
  path: '',
  component: FullPageLayoutComponent,
  children: [{      
    path: '',
    component: LoginComponent
  }, {
    path: 'sing-up',
    component: SingUpComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
