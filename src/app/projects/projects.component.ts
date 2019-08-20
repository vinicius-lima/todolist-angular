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
  private editingName: string;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit() {
    this.listProjects();
    this.editingName = "";
  }

  editProject(projectId: number, projectName: string) {
    let project: Project = {
      id: projectId,
      name: projectName,
      author: "",
      creationDate: ""
    };

    this.apiClientService.editProject(project).subscribe(
      response => {
        //location.reload();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
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

  nameOnBlur(target: any, projectId: number) {
    if (target.value !== this.editingName) {
      if (
        confirm(
          `Change project name from ${this.editingName} to ${target.value}`
        )
      ) {
        this.editProject(projectId, target.value);
      } else {
        target.value = this.editingName;
      }
    }
    this.editingName = "";
  }

  nameOnFocus(target: any) {
    this.editingName = target.value;
  }
}
