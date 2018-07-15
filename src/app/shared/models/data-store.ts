import { User } from "./user";
import { Hall } from "./hall";
import { Booking } from "./booking";
import { Time } from "./time";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { StoreEvent } from "./store-event";
export interface State {
  currentUser: User;
  hallList: Hall[];
  displayBookingList: Booking[];
  timeList: Time[];
  isLoggedin: boolean;
}

const initialState: State = {
  currentUser: { uid: " ", email: " ", level: " ", username: " " },
  hallList: [],
  displayBookingList: [],
  timeList: [],
  isLoggedin: false
};

export class DataStore {
  private store: BehaviorSubject<State> = new BehaviorSubject<State>(
    initialState
  );
  private store$: Observable<State> = this.store
    .asObservable()
    .pipe(distinctUntilChanged());

  observe(): Observable<State> {
    return this.store$;
  }

  dispatch(event: StoreEvent): void {
    console.log("in dispatch function of datastore");
    this.store.next(event.getNewState(this.store.getValue()));
  }
}
