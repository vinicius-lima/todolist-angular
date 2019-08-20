import { Component, OnInit, Input } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ApiClientService } from "../api-client.service";
import { Project } from "src/models/project";

@Component({
  selector: "app-delete-project",
  templateUrl: "./delete-project.component.html",
  styleUrls: ["./delete-project.component.css"]
})
export class DeleteProjectComponent implements OnInit {
  @Input() project: Project;
  private confirmProject: string;

  closeResult: string;

  constructor(
    private apiClientService: ApiClientService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.confirmProject = "";
  }

  open(content: any) {
    this.confirmProject = "";
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

  deleteProject() {
    if (this.confirmProject !== this.project.name) {
      return;
    }
    this.modalService.dismissAll("Removed");

    this.apiClientService.deleteProject(this.project.id).subscribe(
      response => {
        location.reload();
      },
      error => {
        alert(error.message || JSON.stringify(error));
      }
    );
  }
}
