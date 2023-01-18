import { Component, Inject, Input,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GetDataService } from '../get-data.service';
import { Data } from '../data';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {

  @ViewChild('descriptionText', { static: false })
  descriptionText!: ElementRef;
  @ViewChild('newDewDate', { static: false })
  newDewDate!: ElementRef;

  description!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {taskName:string, date:Date, description: string, dueDate:Date, id:number},
    private getDataService: GetDataService
    ) { }

  onSave(){
    this.data.description = this.descriptionText.nativeElement.innerText;
    this.data.dueDate = this.newDewDate.nativeElement.innerText;
    this.getDataService.putData(this.data, this.data.id).subscribe({
      next: (res) => {
        alert('Product updated successfully');
      },
      error: () => {
        alert('An error occured while updating the product');
      },
    });
  }
}
