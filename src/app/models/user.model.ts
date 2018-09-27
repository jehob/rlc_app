export class FullUser {
  public id: string;
  public email: string;
  public name: string;
  public birthday: Date;
  public phone_number: string;
  public street: string;
  public city: string;
  public postal_code: string;

  constructor(
    id: string,
    email: string,
    name: string,
    birthday: Date,
    phone_number: string,
    street: string,
    city: string,
    postal_code: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.birthday = birthday;
    this.phone_number = phone_number;
    this.street = street;
    this.city = city;
    this.postal_code = postal_code;
  }
}

export class RestrictedUser {

}
