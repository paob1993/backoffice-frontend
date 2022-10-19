import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicleId: string;
  vehicle: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'];
      this.getVehicle();
    });
  }

  getVehicle(): void {
    this.vehiclesService.getVehicle(this.vehicleId).subscribe({
      next: (v: any) => {
        if (v.error) {
          Swal.fire({
            title: 'Error',
            text: v.error,
            icon: 'error',
            heightAuto: false
          }).then(() => {
            this.router.navigate(['vehicles'])
          });
        } else {
          this.vehicle = v;
        }
      }, error: (e) => {
        console.log(e)
        Swal.fire({
          title: 'Error',
          text: e.error,
          icon: 'error',
          heightAuto: false
        });
      }
    });
  }

}
