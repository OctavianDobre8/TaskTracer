import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [MatCardModule, TaskCardComponent, CommonModule],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss',
})
export class TaskGridComponent implements OnInit {
  taskList: Task[] = [];

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.taskList = tasks));
  }
}
