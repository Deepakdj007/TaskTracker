import { Component, EventEmitter, Output } from '@angular/core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-tracker';
  faTasks = faTasks;


eventsSubject: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  addNewTask() {
    this.dialog.open(DialogComponent, {
      width:"350px",
    }).afterClosed().subscribe(val=>{
      this.eventsSubject.next();
  });
  }
}
