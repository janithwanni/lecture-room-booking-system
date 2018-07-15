import { StoreEvent } from "./store-event";
import { State } from "./data-store";
import { User } from "./user";
import { Booking } from "./booking";

export class SetCurrentUser extends StoreEvent {
  constructor(payload: User) {
    console.log("in constructor of sercurrentuser store event");
    super(payload);
  }
  getNewState(state: State) {
    console.log("in getnewstate fucntion of setcurrentuser storevent");
    return {
      ...state,
      currentUser: this.payload,
      hallList: [],
      displayBookingList: [],
      timeList: []
    };
  }
}
export class PushBookingtoList extends StoreEvent {
  constructor(payload: Booking[]) {
    super(payload);
    console.log(payload);
  }

  getNewState(state: State) {
    return {
      ...state,
      currentUser: state.currentUser,
      hallList: state.hallList,
      displayBookingList: this.payload,
      timeList: state.timeList
    };
  }
}
