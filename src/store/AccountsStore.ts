import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

export default class AccountStore {
  private _accounts: IUser[];

  constructor() {
    this._accounts = [];
    makeAutoObservable(this);
  }

  setAccounts(accounts: IUser[]) {
    this._accounts = accounts;
  }

  get accounts() {
    return this._accounts;
  }
}
