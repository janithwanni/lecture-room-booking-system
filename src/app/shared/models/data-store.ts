import { User } from "./user";
import { Hall } from "./hall";
import { Booking } from "./booking";
import { Time } from "./time";

export class DataStore {
  currentUser: User;
  hallList: Hall[];
  bookingList: Booking[];
  timeList: Time[];
  isLoggedin: boolean;
}
