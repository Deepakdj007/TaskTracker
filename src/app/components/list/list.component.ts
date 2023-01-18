import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { GetDataService } from 'src/app/get-data.service';
import { Data } from 'src/app/data';
import {MatDialog} from '@angular/material/dialog';
import { DescriptionComponent } from 'src/app/description/description.component';
import { Subscription, Observable } from 'rxjs';
import { DialogComponent } from 'src/app/dialog/dialog.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private eventsSubscription!: Subscription;

  
  @Input()
  events!: Observable<void>;
  addOrEdit:string = "Add";

  faThumbtack = faThumbtack;
  tasks:any;
  isEmpty = false;
  tooltipPosition: string = "above";
  color = true;


  constructor(
    private getdataService: GetDataService,
    public dialog: MatDialog
    ) { }



  ngOnInit(){
    this.getAllProducts();
    this.events.subscribe(() => this.getAllProducts());
  }


  getAllProducts(){
    this.getdataService.getData()
    .subscribe(data => { 
      this.tasks = data;
      if(!this.tasks.length){
        this.isEmpty = true;
      }
    });
  }
  openDialog(data:any) {
    this.dialog.open(DescriptionComponent, {
      width:"350px",
      data: data
    }).afterClosed().subscribe(val=>{
        this.getAllProducts();
    });
  }

unPin(id:number){
    this.getdataService.deleteData(id)
  .subscribe({
    next:(res)=>{

            alert("Product deleted Successfully");
            this.getAllProducts();
          },
    error:(err)=>{
      alert("Error while deleting the product")
    },
  })

  }  
  editItem(task:any){
    this.dialog.open(DialogComponent, {
      width:"350px",
      data: {task:task,addOrEdit:"Edit"}
    }).afterClosed().subscribe(val=>{
        this.getAllProducts();
    });
  }


  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
