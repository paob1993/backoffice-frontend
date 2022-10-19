import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Vehicle } from 'src/app/models/vehicle';
import { BrandsService } from 'src/app/services/brands.service';
import { ColorsService } from 'src/app/services/colors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() vehicle: Vehicle;
  @Output('onSave') eventSave = new EventEmitter();
  colors: Color[];
  brands: Brand[];
  vehicleForm: FormGroup;
  uploadImage: any;
  buttonPress: boolean;

  constructor(
    private colorsService: ColorsService,
    private brandsService: BrandsService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buttonPress = false;
    this.loadData();
    this.createForm();
  }

  ngOnChanges(): void {
    if (this.vehicle) {
      this.updateForm();
      this.uploadImage = this.vehicle.image;
    }
  }

  loadData() {
    this.brandsService.getBrands().subscribe((response: any) => {
      if (response.error) {
        Swal.fire({
          title: 'Error',
          text: response.error,
          icon: 'error',
          heightAuto: false
        });
      } else {
        this.brands = response;
      }
    });
    this.colorsService.getColors().subscribe((response: any) => {
      if (response.error) {
        Swal.fire({
          title: 'Error',
          text: response.error,
          icon: 'error',
          heightAuto: false
        });
      } else {
        this.colors = response;
      }
    });
  }

  createForm(): void {
    this.vehicleForm = this.formBuilder.group({
      '_id': [null, []],
      'identification': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'brand': ['', Validators.required],
      'color': ['', Validators.required],
      'date': [null, Validators.required],
      'year': ['', Validators.required],
      'status': [true, []],
      'image': [null, []]
    });
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.uploadImage = reader.result;
        this.vehicleForm.patchValue({ 'image': reader.result });
    };
  }

  updateForm(): void {
    this.vehicleForm.patchValue({
      '_id': this.vehicle._id,
      'identification': this.vehicle.identification,
      'brand': this.vehicle.brand._id,
      'color': this.vehicle.color._id,
      'date': this.datePipe.transform(new Date(this.vehicle.date), 'yyyy-MM-dd'),
      'year': this.vehicle.year,
      'status': this.vehicle.status,
      'image': this.vehicle.image
    })
  }

  save(): void {
    this.buttonPress = true;
    if (this.vehicleForm.valid) {
      this.eventSave.emit(this.vehicleForm.value);
    }
  }

  cancel(): void {
    this.router.navigate(['vehicles']);
  }

}
