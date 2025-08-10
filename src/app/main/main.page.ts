import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicModule } from '@ionic/angular'; // So we dont need to import each individual Ion thing from the forms
import { CreateDBService } from '../create-db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class MainPage implements OnInit {

  ionicForm!: FormGroup;
  // databaseName: any;
  // schemaName: any;
  outMsg: any = { msg: '' };

  constructor(private formBuilder: FormBuilder, private createDB: CreateDBService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      databaseName: ['', Validators.required],
      schemaName: ['', Validators.required]
    })
  }

  async sendMakeDB() {
    if (!this.ionicForm.valid) {
      alert('Please provide all the required values!');
    }
    // Send info to nodeJS file
    else {
      // this.ionicForm.value is in JSON format { a: b }
      this.createDB.postDBInfo(this.ionicForm.value).subscribe({
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
}
