import { Injectable } from "@angular/core";
import { DataStore } from "../models/data-store";
import { User } from "../models/user";
import {
  SetCurrentUser,
  PushBookingtoList,
  PushTimeList,
  PushHallList,
  PushBookingArraytoList
} from "../models/event-list";
import { flatMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Booking } from "../models/booking";
import { Time } from "../models/time";
import { Hall } from "../models/hall";

@Injectable({
  providedIn: "root"
})
export class DatastoreManagerService {
  constructor(private store: DataStore) {}

  setCurrentUser(user: User) {
    this.store.dispatch(new SetCurrentUser(user));
  }

  getCurrentUser(): Observable<User> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.currentUser);
      })
    );
  }

  pushBookingtoList(booking: Booking) {
    console.log("push booking to list");
    this.store.dispatch(new PushBookingtoList(booking));
  }

  pushBookingArraytoList(bookings: Booking[]) {
    console.log("pushing booking array to list");
    this.store.dispatch(new PushBookingArraytoList(bookings));
  }

  getDisplayBookingList(): Observable<Booking[]> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.displayBookingList);
      })
    );
  }

  pushTimeList(list: Time[]) {
    this.store.dispatch(new PushTimeList(list));
  }

  getTimeList(): Observable<Time[]> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.timeList);
      })
    );
  }

  pushHallList(list: Hall[]) {
    this.store.dispatch(new PushHallList(list));
  }

  getHallList(): Observable<Hall[]> {
    return this.store.observe().pipe(
      flatMap(value => {
        return of(value.hallList);
      })
    );
  }
}
