import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Status } from '../../helpers/help';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  statuses: Status[];
  ngOnInit(): void {
    this.statuses = Object.values(Status);
  }
  selectStatus(status: Status): void {
    console.log(status);
    this.statusSelected.emit(status);
  }

  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
}
