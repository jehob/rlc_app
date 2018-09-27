export class FullRecord {
  constructor(
    public id: number,
    public created_on: Date,
    public last_edited: Date,
    public first_contact_date: Date,
    public last_contact_date: Date,
    public record_token: string,
    public note: string,
    public state: string,
    public tags: [number, string],
    public from_rlc: number,
    public client: number,
    public working_on_record: [number]
  ) {
    this.id = id;
    this.created_on = created_on;
    this.last_contact_date = last_contact_date;
    this.last_edited = last_edited;

  }
}

export class RestrictedRecord {}
