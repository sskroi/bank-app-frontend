import { makeAutoObservable } from "mobx";
import { IAccount } from "../types/types";

export default class AccountStore {
  private _accounts: IAccount[];

  constructor() {
    this._accounts = [];
    makeAutoObservable(this);
  }

  setAccounts(accounts: IAccount[]) {
    this._accounts = accounts;
  }

  get accounts() {
    return this._accounts;
  }
}
