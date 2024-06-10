import { Component, OnInit } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { Task } from '../task';
import { Status } from '../../helpers/help';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    TaskGridComponent,
    TaskListComponent,
    MatIcon,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss',
})
export class TasksViewComponent {
  isList: boolean;
  notificationMessage: string;
  constructor(private notificationService: NotificationService) {}
  ngOnInit() {
    this.notificationService.notificationSubject.subscribe(
      (hasNotifications) =>
        (this.notificationMessage = hasNotifications
          ? 'New notifications, please refresh the page'
          : '')
    );
  }
}
