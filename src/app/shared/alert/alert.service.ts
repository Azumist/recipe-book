import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface Alert {
  type: string;
  title?: string;
  message: string;
}

@Injectable()
export class AlertService {
    // alertAppeared = new Subject<Alert>();
    alertsChanged = new Subject<Alert[]>();
    private alertList: Alert[] = [];

    getAlerts(): Alert[] {
      // only reference is returned instead of copy, as alerts aren't stored in DB anyway
      return this.alertList;
    }

    addAlert(alert: Alert): void {
      this.alertList.push(alert);
      this.alertsChanged.next(this.alertList);
    }
  
    dismissAlert(index: number): void {
      this.alertList.splice(index, 1);
      this.alertsChanged.next(this.alertList);
    }

    clearAlerts(): void {
      this.alertList = [];
      this.alertsChanged.next(this.alertList);
    }
}