import { Injectable } from "@angular/core";
import { FullUser } from "../models/user.model";
import {Observable} from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class PersonalUserService {
    private user: FullUser;

    constructor() {
        this.user = new FullUser();
    }

    setUser(userObject: {
        id: string;
        email: string;
        name: string;
        birthday: Date;
        phone_number: string;
        street: string;
        city: string;
        postal_code: string;
    }) {
        console.log(userObject);
        const user: FullUser = new FullUser(
            userObject.id,
            userObject.email,
            userObject.name,
            userObject.birthday,
            userObject.phone_number,
            userObject.street,
            userObject.city,
            userObject.postal_code
        );
        //console.log(user);
        this.user = user;
    }

    getUser(): Observable<FullUser>{
        return new Observable((observer) => {

        })
    }
}
