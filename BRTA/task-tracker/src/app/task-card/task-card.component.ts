import { Component, Input } from '@angular/core';
import { Task } from '../task';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() deleteRequest = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.taskService.editTask(task).subscribe((task) => {
        console.log('Task edited successfully', task);
      });
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((task) => {
      console.log('Task deleted successfully', task);
      window.location.reload();
    });
  }
}
