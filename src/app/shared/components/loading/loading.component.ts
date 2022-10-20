import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private spinner: NgxSpinnerService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.isLoading.subscribe(isLoading => {
      if (isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

}
