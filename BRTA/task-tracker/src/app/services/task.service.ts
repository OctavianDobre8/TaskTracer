import { Injectable } from '@angular/core';
import { Status } from '../../helpers/help';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseURL = 'http://localhost:5119/Task';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  addTask(newTask: Task) {
    return this.httpClient.post<Task>(this.baseURL, newTask, {
      headers: this.httpOptions.headers,
      responseType: 'text' as 'json',
    });
  }
  editTask(task: Task) {
    return this.httpClient.put<Task>(`${this.baseURL}/${task.id}`, task);
  }

  deleteTask(task: Task) {
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`, {
      headers: this.httpOptions.headers,
      responseType: 'text' as 'json',
    });
  }
}
