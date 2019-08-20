import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiClientService } from "../api-client.service";
import { Task } from "src/models/task";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"]
})
export class CreateTaskComponent implements OnInit {
  @Input() projectId: number;
  private task: Task;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit() {
    this.task = {
      id: 0,
      title: "",
      description: "",
      author: "",
      status: "TODO",
      creationDate: "",
      lastUpdate: "",
      projectId: this.projectId
    };
  }

  open(content: any) {
    this.task = {
      id: 0,
      title: "",
      description: "",
      author: "",
      status: "TODO",
      creationDate: "",
      lastUpdate: "",
      projectId: this.projectId
    };

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  private creationDate(): string {
    let today = new Date();

    let day =
      today.getDate() > 9 ? String(today.getDate()) : "0" + today.getDate();

    let month: any = today.getMonth() + 1;
    month = month > 9 ? String(month) : "0" + month;

    let year = String(today.getFullYear());

    return `${day}/${month}/${year}`;
  }

  createTask() {
    if (this.task.title.replace(/\s/g, "").length === 0) {
      alert("Please, type a task title");
      return;
    }
    if (this.task.author.replace(/\s/g, "").length === 0) {
      alert("Please, type a task author");
      return;
    }
    this.modalService.dismissAll("Removed");

    this.task.creationDate = this.creationDate();
    this.task.lastUpdate = this.creationDate();
    this.apiClientService.createTask(this.task).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
