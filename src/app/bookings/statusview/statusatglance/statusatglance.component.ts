import { Component, OnInit } from "@angular/core";
import { HallInfoManagerService } from "../../../shared/services/hall-info-manager.service";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-statusatglance",
  templateUrl: "./statusatglance.component.html",
  styleUrls: ["./statusatglance.component.scss"]
})
export class StatusatglanceComponent implements OnInit {
  status: {
    now: Observable<number>;
    tommorrow: Observable<number>;
    nextweek: Observable<number>;
  } = { now: of(0), tommorrow: of(0), nextweek: of(0) };

  constructor(private hallinfo: HallInfoManagerService) {
    /* this.setupComponent(); */
  }

  /*  setupComponent() {
    const currDate = new Date();
    this.status.now = this.hallinfo.getFreeHalls(
      currDate.getFullYear() + "",
      currDate.getMonth() + "",
      currDate.getDate() + ""
    );
    this.status.tommorrow = this.hallinfo.getFreeHalls(
      currDate.getFullYear() + "",
      currDate.getMonth() + "",
      currDate.getDate() + 1 + ""
    );
    const nextweek = new Date(currDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.status.nextweek = this.hallinfo.getFreeHalls(
      nextweek.getFullYear() + "",
      nextweek.getMonth() + "",
      nextweek.getDate() + 1 + ""
    );

    this.status.now.subscribe(data => {
      console.log(data);
    });
  } */
  ngOnInit() {}
}
