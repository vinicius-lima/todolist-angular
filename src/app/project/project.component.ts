import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "src/models/project";
import { Location } from "@angular/common";
import { ApiClientService } from "../api-client.service";
import { Task } from "src/models/task";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"]
})
export class ProjectComponent implements OnInit {
  private project: Project;
  private tasks: Task[] = [];
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private apiClientService: ApiClientService,
    private location: Location
  ) {}

  ngOnInit() {
    this.project = { id: 0, name: "N/A", author: "N/A", creationDate: "N/A" };
    this.id = +this.route.snapshot.paramMap.get("id");
    this.getProject();
  }

  getProject() {
    this.apiClientService.getProject(this.id).subscribe(
      response => {
        this.project = response;
        this.listTasks();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }

  goBack() {
    this.location.back();
  }

  listTasks() {
    this.apiClientService.listTasks(this.project.id).subscribe(
      response => {
        this.tasks = response;
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
