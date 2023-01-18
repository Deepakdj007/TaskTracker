import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from '../get-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  itemForm!:FormGroup
  date = new Date();
  action:string = "Add";

  constructor(private fb:FormBuilder, 
    private api:GetDataService,
    @Inject(MAT_DIALOG_DATA) public received: any){}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      taskName:['', [Validators.required]],
      date:[this.date],
      description:['',Validators.required],
      dueDate:['']
    })
    if(this.received){
      this.action = "Save";
      this.itemForm.controls['taskName'].setValue(this.received.task.taskName);
      this.itemForm.controls['date'].setValue(this.date);
      this.itemForm.controls['description'].setValue(this.received.task.description);
      this.itemForm.controls['dueDate'].setValue(this.received.task.dueDate);
    }
  }
  addOrEditProduct() {
    if(this.action === "Add"){
      if (this.itemForm.valid) {
        this.api.postData(this.itemForm.value).subscribe({
          next: (res) => {
            alert('Product Added successfully');
            this.itemForm.reset();
          },
          error: () => {
            alert('An error occured while adding the product');
          },
        });
      }
    }
    else{
      if (this.itemForm.valid) {
        this.api.putData(this.itemForm.value, this.received.task.id).subscribe({
          next: (res) => {
            alert('Product Updated successfully');
          },
          error: () => {
            alert('An error occured while adding the product');
          },
        });
      }
    }
  }

}
