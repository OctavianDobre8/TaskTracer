import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { MatIcon } from '@angular/material/icon';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { FilterComponent } from '../filter/filter.component';
import { Status } from '../../helpers/help';
import { MatButtonModule } from '@angular/material/button';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TasksViewComponent,
    MatIcon,
    TaskGridComponent,
    FilterComponent,
    MatButtonModule,
    TaskCardComponent,
    MatCardModule,
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  isList: boolean;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.filteredTasks = this.tasks = tasks));
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.taskService.editTask(task);
    });
  }

  deleteTask(taskToDelete: Task): void {
    this.taskService.deleteTask(taskToDelete).subscribe((task) => {
      console.log('Task deleted successfully', task);
      this.taskService
        .getTasks()
        .subscribe((tasks) => (this.filteredTasks = tasks));
    });
  }

  handleStatusSelected(status: Status): void {
    this.filteredTasks = this.tasks.filter((task) => task.status === status);
  }
}
