import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../shared/layouts/dashboard-layout/dashboard-layout.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [{
  path: '',
  component: DashboardLayoutComponent,
  children: [{
    path: '',
    component: VehicleComponent
  }, {
    path: 'add',
    component: AddVehicleComponent
  }, {
    path: 'edit/:id',
    component: EditVehicleComponent
  }, {
    path: 'details/:id',
    component: VehicleDetailsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
