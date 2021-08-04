import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Alert } from "./alert.model";

@Injectable()
export class AlertService {
    alertAppeared = new Subject<Alert>();
    private alertList: Alert[] = [];

    getAlerts(): Alert[] {
      //only reference is returned instead of copy, as alerts aren't stored in DB anyway
      return this.alertList;
    }

    addAlert(alert: Alert): void {
      this.alertList.push(alert);
    }
  
    dismissAlert(index: number): void {
      this.alertList.splice(index, 1);
    }

    clearAlerts(): void {
      this.alertList = [];
    }
}