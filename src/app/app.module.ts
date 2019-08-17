import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProjectComponent } from "./project/project.component";
import { TaskComponent } from "./task/task.component";
import { ProjectsComponent } from "./projects/projects.component";

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    TaskComponent,
    ProjectsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
