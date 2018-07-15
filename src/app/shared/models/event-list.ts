import { StoreEvent } from "./store-event";
import { State } from "./data-store";
import { User } from "./user";

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
      timeList: [],
      isLoggedin: false
    };
  }
}
