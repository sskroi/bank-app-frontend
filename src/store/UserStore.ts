import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

export default class UserStore {
  private _isAuth: boolean;
  private _user: IUser | null;

  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this._isAuth = isAuth;
  }

  setUser(user: IUser | null = null) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
