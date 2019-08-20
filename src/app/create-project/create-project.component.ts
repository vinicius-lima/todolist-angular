import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Project } from "src/models/project";
import { ApiClientService } from "../api-client.service";

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrls: ["./create-project.component.css"]
})
export class CreateProjectComponent implements OnInit {
  private project: Project;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private apiClientService: ApiClientService
  ) {}

  ngOnInit() {
    this.project = { id: 0, name: "", author: "", creationDate: "" };
  }

  open(content: any) {
    this.project = { id: 0, name: "", author: "", creationDate: "" };
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

  createProject() {
    if (this.project.name.replace(/\s/g, "").length === 0) {
      alert("Please, type a project name");
      return;
    }
    if (this.project.author.replace(/\s/g, "").length === 0) {
      alert("Please, type a project author");
      return;
    }

    this.modalService.dismissAll("Removed");
    this.project.creationDate = this.creationDate();
    this.apiClientService.createProject(this.project).subscribe(
      response => {
        //console.log(response.headers.get("Location"));
        location.reload();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
