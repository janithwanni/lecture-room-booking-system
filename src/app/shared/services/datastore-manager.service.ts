import { Injectable } from "@angular/core";
import { DataStore } from "../models/data-store";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class DatastoreManagerService {
  dataStore: DataStore = {
    currentUser: null,
    isLoggedin: false,
    bookingList: [],
    hallList: [],
    timeList: []
  };
  constructor() {}

  setCurrentUser(user: User): void {
    console.log("setting new user");
    console.log(user);
    this.dataStore.currentUser = user;
  }

  getCurrentUser(): User {
    return this.dataStore.currentUser;
  }

  setIsLoggedIn(value: boolean) {
    this.dataStore.isLoggedin = value;
  }

  getIsLoggedIn(): boolean {
    return this.dataStore.isLoggedin;
  }
}
