import { StoreEvent } from "./store-event";
import { State } from "./data-store";
import { User } from "./user";
import { Booking } from "./booking";
import { Time } from "./time";
import { Hall } from "./hall";

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
  constructor(payload: Booking) {
    super(payload);
    console.log("push bookigs to list payload", payload);
  }

  getNewState(state: State) {
    state.displayBookingList.push(this.payload);
    return {
      ...state,
      currentUser: state.currentUser,
      hallList: state.hallList,
      displayBookingList: state.displayBookingList,
      timeList: state.timeList
    };
  }
}

export class PushBookingArraytoList extends StoreEvent {
  constructor(payload: Booking[]) {
    super(payload);
  }
  getNewState(state: State) {
    console.log("pushing state", state, this.payload);
    return {
      ...state,
      currentUser: state.currentUser,
      hallList: state.hallList,
      displayBookingList: this.payload,
      timeList: state.timeList
    };
  }
}
export class PushTimeList extends StoreEvent {
  constructor(payload: Time[]) {
    /* console.log(payload); */
    super(payload);
  }

  getNewState(state: State) {
    console.log(state);
    return {
      ...state,
      currentUser: state.currentUser,
      hallList: state.hallList,
      displayBookingList: state.displayBookingList,
      timeList: this.payload
    };
  }
}

export class PushHallList extends StoreEvent {
  constructor(payload: Hall[]) {
    super(payload);
  }

  getNewState(state: State) {
    return {
      ...state,
      currentUser: state.currentUser,
      hallList: this.payload,
      displayBookingList: state.displayBookingList,
      timeList: state.timeList
    };
  }
}
