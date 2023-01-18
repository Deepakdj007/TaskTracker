import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetDataService{

  constructor(private http:HttpClient ) { }
  data:any;

  getData(){
    return this.http.get('http://localhost:3000/posts/');
  }

  postData(data:any){
    return this.http.post<any>('http://localhost:3000/posts/', data);
  }

  putData(data:any, id:number){
    return this.http.put<any>('http://localhost:3000/posts/'+id, data);
  }
  patchData(data:any){
    this.http.put('http://localhost:3000/posts', data).subscribe({
      next: (res) => {
        alert('Product updated successfully');
      },
      error: () => {
        alert('An error occured while updating the product');
      },
    });;
  }
  deleteData(id:number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id);
  }
}
