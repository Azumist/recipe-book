import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AlertService, Alert } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  alertList: Alert[];
  private alertsInterval: Subscription;
  private alertsChangedSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertsChangedSub = this.alertService.alertsChanged
    .subscribe((alerts) => {
      this.alertList = alerts;
    });

    this.alertsInterval = interval(10000)
    .subscribe(() => {
      this.alertService.clearAlerts();
    });
  }

  ngOnDestroy(): void {
    this.alertsChangedSub.unsubscribe();
    this.alertsInterval.unsubscribe();
  }

  onDismiss(index: number) {
    this.alertService.dismissAlert(index);
  }

}
