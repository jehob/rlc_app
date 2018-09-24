import { Component, OnInit } from "@angular/core";

export interface Section {
  id: string;
  type: string;
  status: string;
}

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.scss"]
})
export class RecordsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  value = "Search...";

  records: Section[] = [
    {
      id: "2152-432-46283133-9",
      type: "employment",
      status: "orange"
    },
    {
      id: "2152-432-46283133-9",
      type: "employment",
      status: "orange"
    },
    {
      id: "2152-432-46283133-9",
      type: "stay",
      status: "red"
    },
    {
      id: "2152-432-46283133-9",
      type: "stay",
      status: "green"
    },
    {
      id: "2152-432-46283133-9",
      type: "asylum",
      status: "green"
    },
    {
      id: "2152-432-46283133-9",
      type: "asylum",
      status: "red"
    },
    {
      id: "2152-432-46283133-9",
      type: "stay",
      status: "green"
    },
    {
      id: "2152-432-46283133-9",
      type: "asylum",
      status: "green"
    },
    {
      id: "2152-432-46283133-9",
      type: "asylum",
      status: "red"
    }
  ];
}
