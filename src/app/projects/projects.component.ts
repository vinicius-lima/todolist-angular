import { Component, OnInit } from "@angular/core";
import { Project } from "src/models/project";
import { ApiClientService } from "../api-client.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  private projects: Project[] = [];

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit() {
    this.listProjects();
  }

  listProjects() {
    this.apiClientService.listProjects().subscribe(
      response => {
        this.projects = response;
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
