import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alertList: Alert[];
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertList = this.alertService.getAlerts();
  }

  onDismiss(index: number) {
    this.alertService.dismissAlert(index);
  }


}
