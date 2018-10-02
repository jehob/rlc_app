import { Injectable } from "@angular/core";
import { FullUser } from "../models/user.model";

@Injectable({
    providedIn: "root"
})
export class PersonalUserService {
    private user: FullUser;

    constructor() {}

    setUser(user: FullUser) {
        this.user = user;
    }
}
