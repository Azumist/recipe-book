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
  private alertsInterval = interval(10000);
  private alertsIntervalSub: Subscription;
  private alertsChangedSub: Subscription;

  constructor(private alertService: AlertService) { }

  private onAlertsInterval() {
    this.alertService.clearAlerts();
  }

  ngOnInit(): void {
    this.alertsChangedSub = this.alertService.alertsChanged
    .subscribe((alerts) => {
      this.alertList = alerts;
      // timer resets each time a new alert is added, so user can have time to read
      if (this.alertsIntervalSub) {
        this.alertsIntervalSub.unsubscribe();
        this.alertsIntervalSub = this.alertsInterval.subscribe(() => this.onAlertsInterval());
      }
    });
    this.alertsIntervalSub = this.alertsInterval.subscribe(() => this.onAlertsInterval());
  }

  ngOnDestroy(): void {
    this.alertsChangedSub.unsubscribe();
    this.alertsIntervalSub.unsubscribe();
  }

  onDismiss(index: number) {
    this.alertService.dismissAlert(index);
  }

}
