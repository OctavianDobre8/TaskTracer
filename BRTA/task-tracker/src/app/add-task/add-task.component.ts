import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Status } from '../../helpers/help';
import { Task } from '../task';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  taskName: string;
  taskDescription: string;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  onSubmit(): void {
    // Log the task details and then navigate to the main page

    const newTask = <Task>{
      title: this.taskName,
      description: this.taskDescription,
      status: Status.ToDo,
      assignedTo: 'no one',
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.notificationService.sendMessage('BroadcastMessage', [newTask]);
      this.router.navigate(['/']);
    });
  }

  // Add a cancel method for navigation
  cancel(): void {
    this.router.navigate(['/']);
  }
}
