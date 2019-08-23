import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "src/models/project";
import { Task } from "src/models/task";

@Injectable({
  providedIn: "root"
})
export class ApiClientService {
  baseUrl = "http://192.168.1.197:5001";
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

  createTask(task: Task): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.post<Task>(this.endpoints.tasks, task, httpOptions);
  }

  deleteProject(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.delete<Project>(
      this.endpoints.projects + `/${id}`,
      httpOptions
    );
  }

  deleteTask(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.delete<Task>(this.endpoints.tasks + `/${id}`, httpOptions);
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

  editTask(task: Task): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      }),
      observe: "response" as "body"
    };

    return this.http.put<Task>(
      this.endpoints.tasks + `/${task.id}`,
      task,
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

  getTask(id: number): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<Task>(this.endpoints.tasks + `/${id}`, httpOptions);
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
