import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiClientService } from "../api-client.service";
import { Task } from "src/models/task";

@Component({
  selector: "app-edit-task",
  templateUrl: "./edit-task.component.html",
  styleUrls: ["./edit-task.component.css"]
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task;
  private selectedStatus: string;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit() {
    this.selectedStatus = this.task.status;
  }

  open(content: any) {
    this.selectedStatus = this.task.status;
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

  editTask() {
    if (this.task.title.replace(/\s/g, "").length === 0) {
      alert("Please, type a task title");
      return;
    }
    this.modalService.dismissAll("Removed");

    this.task.status = this.selectedStatus;
    this.task.lastUpdate = this.creationDate();
    this.apiClientService.editTask(this.task).subscribe(
      response => {
        //location.reload();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
