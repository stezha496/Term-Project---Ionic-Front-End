import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicModule } from '@ionic/angular'; // So we dont need to import each individual Ion thing from the forms
import { DatabaseServiceService } from '../database-service.service';
import { MAIN_DATA } from 'src/assets/data/MAIN_DATA';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class MainPage implements OnInit {

  ionicForm!: FormGroup;
  batchData: any[] = MAIN_DATA;
  outMsg: any = { msg: '' };

  constructor(private formBuilder: FormBuilder, private dbService: DatabaseServiceService) {

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      databaseName: ['', Validators.required],
      schemaName: ['', Validators.required]
    })
  }

  // Send form info to create DB
  async sendMakeDB() {
    if (!this.ionicForm.valid) {
      alert('Please provide all the required values!');
    }
    // Send info to nodeJS file
    else {
      // this.ionicForm.value is in JSON format { a: b }
      this.dbService.postDBInfo(this.ionicForm.value).subscribe({
        next: (v: any) => {
          console.log(v);
          this.outMsg = v;
        },
        error: (e) => {
          console.error(e);
          this.outMsg.msg = e.message;
        },
        complete: () => console.info('Complete')
      });
      alert("Info sent");
    }
  }

  // Send data from file to be inserted 
  sendBatchData() {
    this.dbService.insertMany(this.batchData).subscribe({
      next: (v: any) => {
        console.log(v);
        this.outMsg = v;
      },
      error: (e) => {
        console.error(e);
        this.outMsg.msg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }

  // Delete all from db
  sendDeleteAll() {
    this.dbService.deleteAll().subscribe({
      next: (v: any) => {
        console.log(v);
        this.outMsg = v;
      },
      error: (e) => {
        console.error(e);
        this.outMsg.msg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }
}
