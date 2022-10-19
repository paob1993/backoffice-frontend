import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  save(vehicle: Vehicle): void {
    this.vehiclesService.addVehicle(vehicle).subscribe({
      next: (v: any) => {
        if (v.error) {
          Swal.fire({
            title: 'Error',
            text: v.error,
            icon: 'error',
            heightAuto: false
          });
        } else {
          Swal.fire({
            title: 'Éxito',
            text: 'Vehículo agregado exitosamente',
            icon: 'success',
            heightAuto: false
          }).then(() => {
            this.router.navigate(['/vehicles']);
          });
        }
      }, error: (e) => {
        console.log(e)
        Swal.fire({
          title: 'Error',
          text: e.error ? e.error : e.message,
          icon: 'error',
          heightAuto: false
        });
      }
    })
  }

}
