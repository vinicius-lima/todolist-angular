import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "src/models/project";
import { Task } from "src/models/task";

@Injectable({
  providedIn: "root"
})
export class ApiClientService {
  baseUrl = "http://192.168.1.197:5000";
  endpoints = {
    projects: this.baseUrl + "/projects",
    tasks: this.baseUrl + "/tasks"
  };

  constructor(private http: HttpClient) {}

  createProject(project: Project): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.post<Project>(
      this.endpoints.projects,
      project,
      httpOptions
    );
  }

  deleteProject(projectId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.delete<Project>(
      this.endpoints.projects + `/${projectId}`,
      httpOptions
    );
  }

  editProject(project: Project): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.put<Project>(
      this.endpoints.projects + `/${project.id}`,
      project,
      httpOptions
    );
  }

  getProject(id: number): Observable<Project> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<Project>(
      this.endpoints.projects + `/${id}`,
      httpOptions
    );
  }

  listProjects(): Observable<Project[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<Project[]>(this.endpoints.projects, httpOptions);
  }

  listTasks(projectId: number): Observable<Task[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<Task[]>(
      this.endpoints.projects + `/${projectId}/tasks`,
      httpOptions
    );
  }
}
