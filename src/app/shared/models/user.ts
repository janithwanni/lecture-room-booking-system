export class User {
  uid: string;
  username: string;
  email: string;
  level: string;

  constructor(UID: string, Username: string, Email: string, Level: string) {
    this.uid = UID;
    this.username = Username;
    this.email = Email;
    this.level = Level;
  }

  setUID(UID: string) {
    this.uid = UID;
  }

  getUID(): string {
    return this.uid;
  }

  setUserName(Username: string) {
    this.username = Username;
  }

  getUserName(): string {
    return this.username;
  }

  setEmail(Email: string) {
    this.email = Email;
  }

  getEmail(): string {
    return this.email;
  }

  getLevel(): string {
    return this.level;
  }
}
