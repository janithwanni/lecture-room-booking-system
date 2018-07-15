import { Injectable } from "@angular/core";
import { DataStore } from "../models/data-store";
import { User } from "../models/user";
import { SetCurrentUser, PushBookingtoList } from "../models/event-list";
import { flatMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Booking } from "../models/booking";

@Injectable({
  providedIn: "root"
})
export class DatastoreManagerService {
  constructor(private store: DataStore) {
    console.log("in constructor of datastoremanager service");
  }

  setCurrentUser(user: User) {
    console.log("calling setcurrentuser function in datastore manager service");
    this.store.dispatch(new SetCurrentUser(user));
  }

  getCurrentUser(): Observable<User> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.currentUser);
      })
    );
  }

  pushBookingtoList(booking: Booking[]) {
    this.store.dispatch(new PushBookingtoList(booking));
  }

  getDisplayBookingList(): Observable<Booking[]> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.displayBookingList);
      })
    );
  }
}
