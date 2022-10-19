import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vehicle } from '../models/vehicle';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(
    private router: Router,
    private vehicleService: VehiclesService
    ) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((response: any) => {
      if (response.error) {
        Swal.fire({
          title: 'Error',
          text: response.error,
          icon: 'error',
          heightAuto: false
        });
      } else {
        this.vehicles = response;
      }
    });
  }

  goVehicleDetails(id: string): void {    
    this.router.navigate(['vehicles/details', id]);
  }

  addVehicle(): void {    
    this.router.navigate(['vehicles/add']);
  }

  editVehicle(id: string): void {    
    this.router.navigate(['vehicles/edit', id]);
  }

  deleteVehicleConfirm(car: Vehicle) {
    Swal.fire({
      title: 'Eliminar vehículo',
      text: `¿Desea eliminar el vehículo ${car.identification}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteVehicle(car._id);
      }
    });
  }

  deleteVehicle(id: string): void {  
    this.vehicleService.deleteVehicle(id).subscribe((response: any) => {
      if (response.error) {
        Swal.fire({
          title: 'Error',
          text: response.error,
          icon: 'error',
          heightAuto: false
        });
      } else {
        Swal.fire({
          title: 'Éxito',
          text: 'Vehículo eliminado exitosamente',
          icon: 'success',
          heightAuto: false
        }).then(() => {
          this.getVehicles();
        });
      }
    });
  }

}
