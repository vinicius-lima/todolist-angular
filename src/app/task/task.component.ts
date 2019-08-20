import { Component, OnInit, Input } from "@angular/core";
import { ApiClientService } from "../api-client.service";
import { Task } from "src/models/task";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit() {}

  deleteTask() {
    if (confirm(`Do you really want to delete the task "${this.task.title}"`)) {
      this.apiClientService.deleteTask(this.task.id).subscribe(
        response => {
          location.reload();
        },
        error => {
          alert(error.message || JSON.stringify(error));
        }
      );
    }
  }

  iconClass(): string {
    let klass: string = "fa fa-exclamation-circle fa-3x";

    switch (this.task.status) {
      case "TODO":
        klass = "fa fa-exclamation-circle fa-3x";
        break;
      case "DONE":
        klass = "fa fa-check-circle fa-3x";
        break;
      case "ONGOING":
        klass = "fa fa-angle-double-right fa-3x";
        break;
      case "ABANDONED":
        klass = "fa fa-exclamation-circle fa-3x";
        break;
    }

    return klass;
  }

  panelClass(): string {
    let klass: string = "panel panel-gray";

    switch (this.task.status) {
      case "TODO":
        klass = "panel panel-gray";
        break;
      case "DONE":
        klass = "panel panel-green";
        break;
      case "ONGOING":
        klass = "panel panel-yellow";
        break;
      case "ABANDONED":
        klass = "panel panel-red";
        break;
    }

    return klass;
  }
}
