import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProjectComponent } from "./project/project.component";
import { TaskComponent } from "./task/task.component";
import { ProjectsComponent } from "./projects/projects.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    ProjectsComponent,
    CreateProjectComponent,
    DeleteProjectComponent,
    CreateTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
