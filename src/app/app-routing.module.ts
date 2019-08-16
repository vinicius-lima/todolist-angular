import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectComponent } from "./project/project.component";
import { ProjectsComponent } from "./projects/projects.component";

const routes: Routes = [
  { path: "projects", component: ProjectsComponent },
  { path: "project/:id", component: ProjectComponent },
  { path: "", redirectTo: "/projects", pathMatch: "full" },
  { path: "**", redirectTo: "/projects", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
