export class Time {
  id: string;
  value: string;

  constructor(ID: string, Value: string) {
    this.id = ID;
    this.value = Value;
  }

  getID(): string {
    return this.id;
  }

  getValue(): string {
    return this.value;
  }
}
