import { State } from "./data-store";

export abstract class StoreEvent {
  constructor(public payload?: any) {}

  abstract getNewState(state: State): State;
}
