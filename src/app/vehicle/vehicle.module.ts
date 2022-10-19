import { NgModule } from '@angular/core';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleComponent } from './vehicle.component';


@NgModule({
  declarations: [
    VehicleComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    VehicleFormComponent,
    VehicleDetailsComponent
  ],
  imports: [
    SharedModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
