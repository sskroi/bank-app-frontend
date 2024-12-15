import { makeAutoObservable } from "mobx";

export default class AccountStore {
  constructor() {
    this._accounts = [];
    makeAutoObservable(this);
  }

  setAccounts(accounts) {
    this._accounts = accounts;
  }

  get accounts() {
    return this._accounts;
  }
}
